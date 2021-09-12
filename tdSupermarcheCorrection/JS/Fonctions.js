// Permet de récupérer tous les secteurs
function GetAllSecteurs()
{
    $.ajax
    (
        {
            type:"GET",
            url:"PHP/GetAllSecteurs.php",
            success:function(data)
            {
                $("#divSecteurs").append(data);
                GetAllRayonsBySecteur();
            },
            error:function()
            {
                alert("Erreur de récupération : SECTEURS");
            }
        }
    );
}

// Permet de récupérer tous les rayons d'un secteur en particulier
function GetAllRayonsBySecteur()
{  
    $.ajax
    (
        {
            type:"GET",
            url:"PHP/GetAllRayonsBySecteur.php",
            data:"idSecteur="+$("#lstSecteurs option:selected").val(),
            success:function(data)
            {
                $("#divNewTemps").empty();
                $("#divTotalHeures").empty();
                $("#divEmployes").empty();
                $("#divRayons").empty();
                $("#divRayons").append(data);
                GetAllEmployesWorkInRayon();
            },
            error:function()
            {
                alert("Erreur de récupération : RAYONS");
            }
        }
    );
    
}

// Permet de récupérer tous les employes
// qui travaillent dans un rayon en particulier
function GetAllEmployesWorkInRayon()
{
    $.ajax
    (
        {
            type:"GET",
            url:"PHP/GetAllEmployesWorkInRayon.php",
            data:"idRayon="+$("#lstRayons option:selected").val(),
            success:function(data)
            {
                $("#divNewTemps").empty();
                $("#divTotalHeures").empty();
                $("#divEmployes").empty();
                
                $("#divEmployes").append(data);
                GetTotalHeures();
            },
            error:function()
            {
                alert("Erreur de récupération : EMPLOYES");
            }
        }
    );
}

// Permet de récupérer le total d'heures d'un rayon en particulier
function GetTotalHeures()
{
    $.ajax
    (
        {
            type:"GET",
            url:"PHP/GetTotalHeures.php",
            data:"idRayon="+$("#lstRayons").val(),
            success:function(data)
            {
                $("#divTotalHeures").append(data);
                GetNewTemps();
            },
            error:function()
            {
                alert("Erreur de récupération : HEURES");
            }
        }
    );    
}

function GetNewTemps()
{
$.ajax
    (
        {
            type:"GET",
            url:"PHP/GetAllEmployes.php",
            success:function(data)
            {
                $("#divNewTemps").empty();
                $("#divNewTemps").append(data);
            },
            error:function()
            {
                alert("Erreur de récupération : NEWTEMPS");
            }
        }
    );    
}

function InsertNewTime()
{
    if($("#txtDate").val()==="")
    {
        bootbox.alert("Saisir une date !!! ");
    }
    else
    {
        if($("#txtHeures").val()==="")
        {
            bootbox.alert("Saisir une heure !!!");
        }
        else
        {
            $.ajax
            (
                {
                    type:"GET",
                    url:"PHP/InsertNewTime.php",
                    data:"idEmploye="+$('#lstEmployes').val()+"&idRayon="+$('#lstRayons').val()+"&date="+$('#txtDate').val()+"&newTemps="+$('#txtHeures').val(),
                    success:function(data)
                    {
                        bootbox.alert(data);
                        GetAllEmployesWorkInRayon();
                    },
                    error:function()
                    {
                        alert("Erreur de récupération : NEWTEMPS");
                    }
                }
            );     
        }
    }
}
