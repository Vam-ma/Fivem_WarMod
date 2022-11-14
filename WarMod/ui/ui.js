$(function(){
    function display(bool) {
        if (bool) {
            $("#container").show();
        } else {
            $("#container").hide();
        }
    }

    display(false)

    window.addEventListener('message', function(event) {
        var item = event.data;
        if (item.type === "ui") {
            if (item.status == true) {
                display(true)
            } else {
                display(false)
            }
        }
    })
    // if the person uses the escape key, it will exit the resource
    document.onkeyup = function (data) {
        if (data.which == 27) {
            $.post('http://warmod/keyevent', JSON.stringify({}));
            return
        }
    };
})






var header = document.getElementById("header")
var section_left = document.getElementById("left")
var section_center = document.getElementById("center")
var section_right = document.getElementById("right")
var team1 = document.getElementById("team1")
var team2 = document.getElementById("team2")
var teamheader = document.getElementById("teamname")

var teams = ["Team1","Team2"]
var state = true

AddEventListeners(team1,"rgba(218,232,252,1)","rgba(190,202,219,1)",0)
AddEventListeners(team2,"rgba(248,206,204,1)","rgba(191,159,157,1)",1)
Hideobj(section_left);
Hideobj(section_right);
window.addEventListener("message",function(event){
    if(state){
        $('#article').show();
    } else{
        $('#article').hide();
    }
})

function AddEventListeners(obj, basecolor, highlightColor,team){
    obj.addEventListener("mouseover", function()
    {
        obj.style.backgroundColor=highlightColor;
    });
    obj.addEventListener("mouseleave", function()
    {
        obj.style.backgroundColor=basecolor; 
    });
    obj.addEventListener("click", function()
    {
        Hideobj(team1);
        Hideobj(team2);
        Showobj(section_left);
        Showobj(section_right);
        PickTeam(team)
    });
}

function Hideobj(obj){
    obj.style.display = "none"
}
function Showobj(obj){
    obj.style.display = "block"
}
function PickTeam(team){
teamheader.innerHTML = teams[team];
//$.post('http://warmod/keyevent', JSON.stringify("27"))
}