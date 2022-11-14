
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
    var item = 'team'
    if(team == 1){
        item ='team1'
    }
    else if(team == 2){
        item = 'team2'
    }
    Callback(item)
}
function Callback(item){
    fetch(`https://${GetParentResourceName()}/getItemInfo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            itemId: item
        })
    }).then(resp => resp.json()).then(resp => console.log(resp));
}