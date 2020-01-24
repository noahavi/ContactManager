<?php
	$inData = getRequestInfo();
	
	$key = $inData["key"];
	$first = $inData["firstname"]; 
	$last = $inData["lastname"];
	$email = $inData["emailAddress"];
	$phone = $inData["phoneNumber"];

	$conn = new mysqli("sever, username, password");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "UPDATE contacts SET firstname='" . $first . "',lastname='" . $last . "',emailAddress='" . $email . "',phoneNumber='" . $phone . "', WHERE key= $key";
		if( $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}
	
	returnWithError("");
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>