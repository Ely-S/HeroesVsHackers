/**
 * Created by Mahathi on 10/10/2015.
 */
function validateSignup(){
    var m = document.forms["signup"]["user"].value;
    var x = document.forms["signup"]["pwd"].value;
    var a = document.forms["signup"]["pwd2"].value;
    if(m == null || m == "")
    {
        alert("Enter email");
        return false;
    }

    if (x == null || x == "") {
        alert("Enter password");
        return false;
    } ele if (x.length < 6)
    if(a != x && a.length < 6)
    {
        alert("Passwords do not match. Enter correct password");
        return false;
    }
}

function validateSignin(){
    var p = document.forms["signin"]["email"].value;
    var r = document.forms["signin"]["password"].value;
    if(p == null || p == "")
    {
        alert("Enter email");
        return false;
    }
    if((r == null || r == "") || r.length<6)
    {
        alert("Enter password");
        return false;
    }
}