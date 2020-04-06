<?php

function pr($data){
    echo '<pre>';
    print_r($data);
    echo '</pre>';
}

function getApexCookie()
{
    $url = 'http://www.aidea-ph.com/cgi-bin/log/login.cgi?action=logme&ajx=1&token=199&lang=1';
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $url,
        CURLOPT_POST => 1,
        CURLOPT_HTTPHEADER => array("Content-Type:multipart/form-data"),
        CURLOPT_POSTFIELDS => 'data=0%7Cchris%20t%7C09092666456%7C%7C%7CCHROME_75.0.3770.100%7CWIN32%7CWINDOWS%20NT%206.1%7C1',
        CURLOPT_HEADERFUNCTION => function ($ch, $headerLine) use (&$cookies) {
            if (preg_match('/^Set-Cookie:\s*([^;]*)/mi', $headerLine, $cookie) == 1)
                $cookies[] = $cookie;
            return strlen($headerLine);
        }
    ]);
    $resp = curl_exec($curl);
    curl_close($curl);

    return $cookies[0][1];
}

function getApexUserData($apexCookie)
{
    /* Apex Data meaning
    [0] => id
    [1] => nickname
    [2] => resign date
    [3] => full name
    [4] => studio Id
    [5] => Mobile number
    [6] => Local Number
    [7] => position
    [8] => aidea email address
    [9] => 0.5
    [10] => 9
    [11] =>
    [12] => gender
    [13] => Approver
    [14] => employee id
    [15 ] => started working date
    [16] => End working date
    [17] => Birthday
    [18] => 0
    [19] =>
 * */

    $url = 'http://www.aidea-ph.com/cgi-bin/common/local.cgi?action=stf2';
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $url,
        CURLOPT_POST => 1,
        CURLOPT_COOKIE => $apexCookie
    ]);
    $resp = curl_exec($curl);
    curl_close($curl);
    return $resp;
}

function getApexStudioData(){
    $output = [];

    $urlData = file_get_contents('http://www.aidea-ph.com/cgi-bin/gpd.cgi?action=std&code=7583888');

    $apexStudio = explode('[]', $urlData);

    foreach ($apexStudio as $studioData) {
        $studio = explode('~', $studioData);
        if(count($studio)==2) $output[$studio[0]] = $studio[1];
    }

    return $output;
}

function getApexPositionData($apexCookie)
{
    $output = [];
    $url = 'http://www.aidea-ph.com/cgi-bin/common/local.cgi?action=sp';
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $url,
        CURLOPT_POST => 1,
        CURLOPT_COOKIE => $apexCookie
    ]);
    $resp = curl_exec($curl);
    curl_close($curl);

    foreach (explode('', $resp) as $datum){
        $datum = explode('|', $datum);
        if(count($datum)==3) $output[$datum[0]] = $datum[1];
    }

    return $output;
}

function main(){
    $output = [];

    $apexCookie = getApexCookie();
    $apexUserData = getApexUserData($apexCookie);
    $apexPositionData = getApexPositionData($apexCookie);
    $apexStudioData = getApexStudioData();

    $apexUserData = explode('', $apexUserData)[1];
    $apexUsers = explode('', $apexUserData);
    array_pop($apexUsers);
    foreach ($apexUsers as $apexUser) {
        $apexUser = explode('|', $apexUser);

        if($apexUser[7]==1) continue;//position is temp
        if($apexStudioData[$apexUser[4]]=='Internal Consultant') continue;//user is consultant
        if($apexStudioData[$apexUser[4]]=='Guest') continue;//user is guest
        if($apexUser[16]!=='') continue;//user is resign
        if($apexUser[2]!='') continue;//user is resign

        $startDate = explode('-', $apexUser[15]);

        array_push($output, [
            $apexUser[0],
            $apexUser[3],
            $apexStudioData[$apexUser[4]],
            $startDate[1],
            $startDate[2],
            $startDate[0]
        ]);
    }
    pr($output);

    $myfile = fopen("employeeData.json", "w") or die("Unable to open file!");
    fwrite($myfile, json_encode($output));
    fclose($myfile);
}

main();

?>