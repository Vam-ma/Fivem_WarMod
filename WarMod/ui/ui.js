var sec3 = document.getElementById("threesec")
var sec2 = document.getElementById("twosec")

var header = document.getElementById("header")
var section_left = document.getElementById("threeleft")
var section_center = document.getElementById("threecenter")
var section_right = document.getElementById("threeright")
var section_left2 = document.getElementById("twoleft")
var section_right2 = document.getElementById("tworight")
var imgdiv = document.getElementById("img")

var teams = ["Blackops","Marine"]
var units1 = ["Blackops 1","Blackops 2","Blackops 3","Blackops 4","Blackops 5"]
var units2 = ["Marine 1","Marine 2","Marine 3","Marine 4","Marine 5"]
var unitTypes = ["Assault","Support","Scout","Specialist"]
var roles = [
    "Commander", "Group leader","Soldier"
]

AddEventListeners(section_left2,"rgba(218,232,252,1)","rgba(190,202,219,1)","twoleft")
AddEventListeners(section_right2,"rgba(248,206,204,1)","rgba(191,159,157,1)", "tworight")
Hideobj(sec3);
ColumnStyles();
createUnit = [0,0,0,0]
menu = 0
window.addEventListener("message", (event) =>{
    var data = event.data
    if(data.action === "playerlist"){

    }
    if(data.action === "close"){
        Hideobj(header)
        Hideobj(sec3)
    }
})

function ColumnStyles(){
                                                                        //Section 3
    section_left.addEventListener("mouseover", function()
    {
        section_left.style.backgroundColor="rgba(112, 112, 112, 0.8)";
        //ColumnChildMouseOver(section_left)
    });
    section_left.addEventListener("mouseleave", function()
    {
        section_left.style.backgroundColor="rgba(207, 207, 207, 0.2)";
        //ColumnChildMouseLeave(section_left)
    });
    section_center.addEventListener("mouseover", function()
    {
        section_center.style.backgroundColor="rgba(112, 112, 112, 0.8)";
        ColumnChildMouseOver(section_center)
    });
    section_center.addEventListener("mouseleave", function()
    {
        section_center.style.backgroundColor="rgba(207, 207, 207, 0.2)";
        ColumnChildMouseLeave(section_center)
    });
    section_right.addEventListener("mouseover", function()
    {
        section_right.style.backgroundColor="rgba(112, 112, 112, 0.8)";
        ColumnChildMouseOver(section_right)
    });
    section_right.addEventListener("mouseleave", function()
    {
        section_right.style.backgroundColor="rgba(207, 207, 207, 0.2)";
        ColumnChildMouseLeave(section_right)
    });
                                                                        //Section 2
    section_left2.addEventListener("mouseover", function()
    {
        section_left2.style.backgroundColor="rgba(112, 112, 112, 0.8)";
        ColumnChildMouseOver(section_left2)
    });
    section_left2.addEventListener("mouseleave", function()
    {
        section_left2.style.backgroundColor="rgba(207, 207, 207, 0.2)";
        ColumnChildMouseLeave(section_left2)
    });
    section_right2.addEventListener("mouseover", function()
    {
        section_right2.style.backgroundColor="rgba(112, 112, 112, 0.8)";
        ColumnChildMouseOver(section_right2)
    });
    section_right2.addEventListener("mouseleave", function()
    {
        section_right2.style.backgroundColor="rgba(207, 207, 207, 0.2)";
        ColumnChildMouseLeave(section_right2)
    });
}

function ColumnChildMouseOver(column){
    for(var c of column.children){
        c.style.color = "rgba(71,71,71,1)"
    }
}
function ColumnChildMouseLeave(column){
    for(var c of column.children){
        c.style.color = "rgba(22,230,219,0.7)"
    }
}

function AddEventListeners(obj, basecolor, highlightColor,buttonname){
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
        trigger(buttonname)
    });
}
function Hideobj(obj){
    obj.style.display = "none"
}
function Showobj(obj){
    obj.style.display = "block"
}

function trigger(button){
    if(button == "twoleft"){
        if(createUnit[0]===0){
            createUnit[0]=1
            Hideobj(sec2)
            Hideobj(section_center)
            Hideobj(section_right)
            Showobj(sec3)
            CreateUnitList(1)
            ContinueButton(section_left,CreateUnitTypeList)
            menu += 1
            AddHeaderText(teams[0])
            
        }
    }
    if(button == "tworight"){
        if(createUnit[0]===0){
            createUnit[0]=2
            Hideobj(sec2)
            Hideobj(section_center)
            Hideobj(section_right)
            Showobj(sec3)
            CreateUnitList(2)
            ContinueButton(section_left,CreateUnitTypeList)
            menu += 1
            AddHeaderText(teams[1])
        }
    }
}
function AddHeaderText(text){
    var p = document.createElement("h1");
    p.className = "txtheader"
    var text = document.createTextNode(text);
    p.appendChild(text);
    header.appendChild(p);
}
function CreateUnitList(team){
    var p = document.createElement("h2");
    p.className = "txtheader"
    var text = document.createTextNode("Select Unit");
    p.appendChild(text);
    section_left.appendChild(p);
    if(team===1){
        for(var i = 0; i< units1.length; i++){
            CElement(section_left,"h3",units1[i], SelectUnit,1,i+1)
        }
    }
    else{
        for(var i = 0; i< units1.length; i++){
            CElement(section_left,"h3",units2[i], SelectUnit,2,i+1)
        }
    }
}
function SelectUnit(team, unit){
    if(team === 1){
        createUnit[1] = unit
    }
    else{
        createUnit[1] = unit + 5
    }
    var message = "unit:" + createUnit[0].toString() + ":" + createUnit[1].toString();
    fetch(`https://${GetParentResourceName()}/getItemInfo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            itemId: message
        })
    }).then(resp => resp.json()).then(
        function(resp) {
        } 
        
    );
}
function SelectUnitType(type){
    createUnit[2] = type
}
function CElement(parentelement,elementtype, text, cb, param1, param2){
    var p = document.createElement(elementtype);
    p.className = "temp"
    p.addEventListener("mouseover", function(){p.style.color = "rgba(71,71,71,1)"});
    p.addEventListener("mouseleave", function(){p.style.color = "rgba(22,230,219,0.7)"});
    p.addEventListener("click", function(){
        var menuobjs = document.getElementsByClassName("temp")
        for(var obj of menuobjs){
            obj.style.backgroundColor = ""
        }
        p.style.color = "rgba(71,71,71,1)"
        p.style.backgroundColor = "rgba(40,40,40,0.8)"
        cb(param1,param2)
    });
    p.style.display="inline-block";
    p.style.cursor = "pointer";
    p.style.fontSize="2em";
    p.style.padding="0.7em 1em 0.7em 1em";
    var text = document.createTextNode(text);
    p.appendChild(text);
    parentelement.appendChild(p);
}
function ContinueButton(parentelement, cb){
    var p = document.createElement("h3");
    p.addEventListener("mouseover", function(){p.style.color = "rgba(71,71,71,1)"});
    p.addEventListener("mouseleave", function(){p.style.color = "rgba(22,230,219,0.7)"});
    p.addEventListener("click", function(){
        p.style.color = "rgba(71,71,71,1)"
        cb();
    });
    p.style.display="block";
    p.style.position="absolute"
    p.style.cursor = "pointer";
    p.style.fontSize="2em";
    p.style.padding="0.7em 1em 0.7em 1em";
    p.style.bottom = "5%"
    p.style.left = "20%"
    var text = document.createTextNode("Continue");
    p.appendChild(text);
    parentelement.appendChild(p);
}
function CreateUnitTypeList(){
    if(createUnit[1]>=1 && menu === 1){
        var p = document.createElement("h2");
        p.className = "txtheader"
        var text = document.createTextNode("Select Type");
        p.appendChild(text);
        section_left.appendChild(p);
        for(var child in section_left.children){
            section_left.removeChild(section_left.firstChild)
        }
        for(var i = 0; i < unitTypes.length; i++){
            CElement(section_left,"h3",unitTypes[i],SelectUnitType, i+1)
        }
        menu += 1
        ContinueButton(section_left,RoleSelection)
    }
    
}
function SetRole(role){
    createUnit[3] = role
}
function RoleSelection(){
    if(createUnit[2]>=1 && menu === 2){
        for(var child in section_left.children){
            section_left.removeChild(section_left.firstChild)
        }
        for(var i = 0; i < roles.length; i++){
            CElement(section_left,"h3",roles[i],SetRole, i+1)
        }
        menu += 1
        ContinueButton(section_left,CloseNUI)
    }
}

function CloseNUI(){
    
    fetch(`https://${GetParentResourceName()}/getItemInfo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            itemId: 'close'
        })
    }).then(resp => resp.json()).then(
        function(resp) {
            console.log(resp)
            if(resp === "close"){
                Hideobj(header)
                Hideobj(sec3)
            }
        } 
        
    );
}