<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	
	// TODO: Add connection paramaters
	$conn = new mysqli();

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT FirstName,LastName,EmailAddress,PhoneNumber" .
			" FROM Contacts" .
			" WHERE FirstName LIKE '%" . $inData["searchText"] . "%'" .
			" OR LastName LIKE '%" . $inData["searchText"] . "%'" .
			" AND UserID=" . $inData["userId"];
			
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				$searchResults .= '"' . $row["FirstName"] . '",';
				$searchResults .= '"' . $row["LastName"] . '",';
				$searchResults .= '"' . $row["EmailAddress"] . '",';
				$searchResults .= '"' . $row["PhoneNumber"] . '",';
			}
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}
	
	$searchResults = substr($searchResults, 0, -1);
	returnWithInfo( $searchResults );

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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>