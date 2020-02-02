<?php
	$inData = getRequestInfo();
    
	$userID = $inData["userID"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$emailAddress = $inData["emailAddress"];
	$phoneNumber = $inData["phoneNumber"];
	
	$conn = new mysqli("localhost", "contactManager", "Exceptions123?", "POOP_Project");

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "INSERT INTO Contacts (UserID,FirstName,LastName,EmailAddress,PhoneNumber)" . 
			" VALUES (" . $userID . ",'" . $firstName . "','" . $lastName . "','" . 
				$emailAddress . "','" . $phoneNumber . "')";
		
		if( $result = $conn->query($sql) != TRUE )
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