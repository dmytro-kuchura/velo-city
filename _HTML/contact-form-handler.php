<?php 
$errors = '';

$myemail = 'support@admin.com';//<-----Put Your email address here.
if(empty($_POST['name'])  ||
   empty($_POST['email']) || 
   empty($_POST['website']) || 
   empty($_POST['message']))
{
    $errors .= "\n Error: all fields are required";
}

$name = $_POST['name'];
$email_address = $_POST['email']; 
$website = $_POST['website']; 
$message = $_POST['message']; 

	$to = $myemail;
    $phone = $phone;
	$email_subject = $website;
	$email_body = "You have received a new message. ".
	" Here are the details:\n Name: $name \n Website: $website \n Email: $email_address \n Message: \n $message"; 
	
	$headers = "From: $myemail\n"; 
	$headers .= "Reply-To: $email_address";
	
	
$mail_sent = mail($to,$email_subject,$email_body,$headers);;
if ($mail_sent == true){ ?>    
<script language="javascript" type="text/javascript">  
if (window.alert('Thank you for the message. We will contact you shortly.'))
{
    
	
window.history.back()
}
else
{
window.history.back()
}
//window.location = 'contact.html';     
</script>    
<?php } else { ?> 
<script language="javascript" type="text/javascript">   
alert('Message not sent. Please, notify the site administrator admin@admin.com');  
window.location = 'contact.html'; 
</script>    
<?php     } ?> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
	<title>Contact form handler</title>
</head>

<body>
<!-- This page is displayed only if there is some error -->
<?php
echo nl2br($errors);
?>


</body>
</html>