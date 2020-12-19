<?php
	require('./vendor/autoload.php');
	$botKey = '1215388410:AAERY8A8D0zoFJwpf2Z0LpaCPWy9ZtYiHdo';
	$userId = '1321144861';
	// $userId = '202300343';

	$requestFactory = new Http\Factory\Guzzle\RequestFactory();
	$streamFactory = new Http\Factory\Guzzle\StreamFactory();
	$client = new Http\Adapter\Guzzle6\Client();

	$apiClient = new \TgBotApi\BotApiBase\ApiClient($requestFactory, $streamFactory, $client);
	$bot = new \TgBotApi\BotApiBase\BotApi($botKey, $apiClient, new \TgBotApi\BotApiBase\BotApiNormalizer());

	function getIp() {
		$keys = [
			'HTTP_CLIENT_IP',
			'HTTP_X_FORWARDED_FOR',
			'REMOTE_ADDR'
		];
		foreach ($keys as $key) {
			if (!empty($_SERVER[$key])) {
				$ip = trim(end(explode(',', $_SERVER[$key])));
				if (filter_var($ip, FILTER_VALIDATE_IP)) {
					return $ip;
				}
			}
		}
	}
	
	$ip = getIp();


	if ($_POST['step'] == '0') {
		$orders = json_decode($_POST['basket']);
		$ordersCount = count($orders);
		$newOrder = "
			Новый заказ
			Кол-во товаров: {$ordersCount}
		";
		$bot->send(\TgBotApi\BotApiBase\Method\SendMessageMethod::create($userId, $newOrder));
		

		$ordersInfo = '';
		$productSummary = 0;
		foreach ($orders as $key => $order ) {
			$productSummary = $productSummary + ($order->count * explode(" ", $order->newPrice)[1]);
			$order = "
			 Товар №" . ($key + 1) . ":
			 Название: {$order->name},
			 Цена: {$order->newPrice},
			 Количество:   {$order->count},
			 -------
			 Общая цена: € " . $order->count * explode(" ", $order->newPrice)[1];
			$bot->send(\TgBotApi\BotApiBase\Method\SendMessageMethod::create($userId, $order));
		}
		
		$bot->send(\TgBotApi\BotApiBase\Method\SendMessageMethod::create($userId, "Всего за товары: € " . $productSummary ));

	}

	if ($_POST['step'] == '1') {
		$personDetail = "
			Данные пользователя:
			Имя: {$_POST['name']}
			Фамилия: {$_POST['sername']}
			E-mail: {$_POST['email']}
			Телефон: {$_POST['phone']}
			Город: {$_POST['city']}
			Адресс: {$_POST['address']}
			Зип-код: {$_POST['zip']}
		";
		$bot->send(\TgBotApi\BotApiBase\Method\SendMessageMethod::create($userId, $personDetail));
	}

	if ($_POST['step'] == '2') {
		$payment = "Пользователь выбирает платежную систему...";
		$bot->send(\TgBotApi\BotApiBase\Method\SendMessageMethod::create($userId, $payment));
	}

	if ($_POST['step'] == '3') {
		$bank = "Пользователь выбрал банк: " . $_POST['bank'];
		$bot->send(\TgBotApi\BotApiBase\Method\SendMessageMethod::create($userId, $bank));
		$bot->send(\TgBotApi\BotApiBase\Method\SendMessageMethod::create($userId, 'Пользователь ждет счет, отправьте ссылку на него:'));

		function setInterval($f, $milliseconds, $bot) {
				$update = true;
				$intervalCount = 0;
				$seconds=(int)$milliseconds/1000;
				$newDate = new DateTime();
				$newDate = $newDate->getTimestamp();

				while($update)
				{
					$intervalCount++;
					$update = $f($bot, $newDate);
					if ($intervalCount > 7 || !$update) {
						$update = false;

					} else {
						sleep($seconds);
					}
				}
		}

		$getLastUpdate = function($bot, $newDate){
			$response = $bot->getUpdates(\TgBotApi\BotApiBase\Method\GetUpdatesMethod::create(['limit'=>'1', 'offset'=>'-1']));
			$updateDate = $response[0]->message->date;
			$updateDate = $updateDate->getTimestamp();
			
			if ($newDate < $updateDate) {
				echo $response[0]->message->text;
				return false;
			} else {
				return true;
			}
		};

		setInterval($getLastUpdate, 5000, $bot);

	}
	
