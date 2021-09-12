<?php
include "cnx.php";

$rqt = $cnx->prepare("select * from travailler where codeE = ".$_GET['idEmploye'].""
        . " and codeR = ".$_GET['idRayon']." and date = '".$_GET['date']."'");
$rqt->execute();
$ligne = $rqt->fetchAll(PDO::FETCH_ASSOC);
if (count($ligne) === 0)
{
    $rqt = $cnx->prepare("insert into travailler values(".$_GET['idEmploye'].",".$_GET['idRayon'].",'".$_GET['date']."',".$_GET['newTemps'].")");
    $rqt->execute();
    echo "Nouveau temps inséré !!!";
}
else
{
    echo "Cet employé à déjà travaillé dans ce rayon à cette date !!!";
}
