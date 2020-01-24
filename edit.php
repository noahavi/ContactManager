<?php
	$inData = getRequestInfo();
	
	$contacts = $inData["user"];
	$id = $inData["id"];
	$set = $inData["set"];
	$change = $inData["change"];

	$conn = new mysqli("sever, username, password");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "UPDATE contacts SET '$set'='$change' WHERE id='$id'";
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