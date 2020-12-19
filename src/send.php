<?
	$to = 'test@test.test'; //Почта получателя, через запятую можно указать сколько угодно адресов
	$subject = 'Заявка с сайта'; //Загаловок сообщения
	$message = '
			<html>
					<head>
							<title>' . $subject . '</title>
					</head>
					<body>
							<p><strong>Отправления форма с данными</strong></p>
							<p>Имя: ' . $_POST['name'] . '</p>
							<p>Email: ' . $_POST['email'] . '</p>
							<p>Телефон: ' . $_POST['phone'] . '</p>
							<p>Адрес: ' . $_POST['address'] . '</p>
							</br>
							<p>Тема писма: <strong>' . $_POST['title'] . '</strong></p>
							<p>Сообщение:' . $_POST['descr'] . '</p>
					</body>
			</html>'; //Текст нащего сообщения можно использовать HTML теги
	$headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
	$headers .= "From: iRobot Bot <from@example.com>\r\n"; //Наименование и почта отправителя
	mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail

