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
var MenuList = ["Groups","Buildings","Units","Shop"]
var ShopCategories = ["Weapons", "Vehicles", "Gears"]
CloseButton();
AddEventListeners(section_left2,"rgba(218,232,252,1)","rgba(190,202,219,1)","twoleft")
AddEventListeners(section_right2,"rgba(248,206,204,1)","rgba(191,159,157,1)", "tworight")
Hideobj(sec3);
ColumnStyles();
createUnit = [0,0,0,0]
menu = 0

var teamUnits = [0,0,0,0,0,0,0,0]
var groups = ["Group 1","Group 2","Group 3","Group 4","Group 5","Group 6","Group 7","Group 8","Group 9","Group 10"]
window.addEventListener("message", (event) =>{
    var data = event.data
    if(data.action === "playerlist"){

    }
    if(data.action === "close"){
        Hideobj(header)
        Hideobj(sec3)
    }
    if(data.action === "open"){
        Showobj(header)
        Showobj(sec3)
    }
    if(data.action.includes("role")){
        var newRole = data.action.split(':')[1];
        createUnit[3] = parseInt(newRole);
        if(createUnit[3] == 1){
            AddHeaderText("Commander")
        } else if(createUnit[3] == 2){
            AddHeaderText("Group Leader")
        } else if(createUnit[3] == 3){
            AddHeaderText("Soldier")
        }
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
    MainScriptCallback(message)
}
function SelectUnitType(type){
    createUnit[2] = type
    var message = "type:" + createUnit[2].toString();
    MainScriptCallback(message)
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
function ContinueButton(parentelement, cb, replaceText = ""){
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
    p.style.bottom = "0%"
    p.style.left = "20%"
    if(replaceText == null || replaceText == ""){
        var text = document.createTextNode("Continue");
    }else{
        var text = document.createTextNode(replaceText);
    }
    
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
    MainScriptCallback( "role:" + role.toString())
}
function RoleSelection(){
    if(createUnit[2]>=1 && menu === 2){
        for(var child in section_left.children){
            section_left.removeChild(section_left.firstChild)
        }
        var p = document.createElement("h2");
        p.className = "txtheader"
        var text = document.createTextNode("Select Role");
        p.appendChild(text);
        section_left.appendChild(p);
        for(var i = 0; i < roles.length; i++){
            CElement(section_left,"h3",roles[i],SetRole, i+1)
        }
        menu += 1
        ContinueButton(section_left,CloseNUI)
    }
}
function CloseNUI(){
    CreateGameMenu()
    MainScriptCallback('close')
}
function CreateMenu(menuIndex){
    for(var i = 0; i< 10; i++){
        try{
            section_left.removeChild(section_left.firstChild)
        }
        catch{
            
        }
    }
    var p = document.createElement("h2");
    p.className = "txtheader"
    var text = document.createTextNode("Select Type");
    p.appendChild(text);
    section_left.appendChild(p);
    if(menuIndex===0){
        for(var i = 0; i< groups.length;i++){
            CElement(section_left,"h3",groups[i])
        }
    }
    else if(menuIndex===1){

    }
    else if(menuIndex===2){
        MainScriptCallback("units")
        for(var i = 0; i< teamUnits.length;i++){
            CElement(section_left,"h3",teamUnits[i])
        }
    }
    else if(menuIndex===3){
        for(var i = 0; i < ShopCategories.length; i++){
            CElement(section_left,"h3",ShopCategories[i], ShopMenus, i)
        }
    }
    ContinueButton(section_left,CreateGameMenu,"Back")
}
function ShopMenus(menu){
    for(var i = 0; i< 15; i++){
        try{
            section_left.removeChild(section_left.firstChild)
        }
        catch{
            
        }
    }
    var p = document.createElement("h2");
    p.className = "txtheader"
    
    if(menu === 0){
        ShopWeaponsMenu()
        var text = document.createTextNode("Weapons");
        p.appendChild(text);
        section_left.appendChild(p);
    } else if(menu === 1){
        ShopVehiclesMenu()
        var text = document.createTextNode("Vehicles");
        p.appendChild(text);
        section_left.appendChild(p);
    } else if(menu === 2){
        ShopGearsMenu()
        var text = document.createTextNode("Gears");
        p.appendChild(text);
        section_left.appendChild(p);
    }
    ContinueButton(section_left,CreateGameMenu,"Back")
}
function ShopWeaponsMenu(){

}
function ShopVehiclesMenu(){

}
function ShopGearsMenu(){

}
function CreateGameMenu(){
    if(menu === 3){
        for(var i = 0; i< 15; i++){
            try{
                section_left.removeChild(section_left.firstChild)
            }
            catch{
                
            }
        }
        var p = document.createElement("h2");
        p.className = "txtheader"
        var text = document.createTextNode("Main Menu");
        p.appendChild(text);
        section_left.appendChild(p);
        if(createUnit[3] == 1){
            for( var i = 0; i< MenuList.length;i++){
                CElement(section_left,"h3",MenuList[i],CreateMenu, i)
            }
        }
        else if(createUnit[3] == 2){
            CElement(section_left,"h3",MenuList[2],CreateMenu, 2)
            CElement(section_left,"h3",MenuList[3],CreateMenu, 3)
        }
        else if(createUnit[3] == 3){
            CElement(section_left,"h3",MenuList[3],CreateMenu, 3)
        }
    }
}
function MainScriptCallback(message){
    message = message.toString();
    try{
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
            console.log(resp)
            if(resp === "close"){
                Hideobj(header)
                Hideobj(sec3)
            }
            else if(resp.includes("units")){
                var units = resp.split(":");
                teamUnits = [0,0,0,0,0,0,0,0];
                for(var i = 1; i<units.length;i++){
                    teamUnits[i-1] = units[i];
                }
            }
        } 
        
    );
    }
    catch{
        console.log("Can't send message to main script")
    }
}
function CloseButton(){
    var p = document.createElement("h1");
    p.className = "txtheader"
    p.style.color = "rgba(22,230,219,1)"
    p.style.fontSize = "4em"
    p.style.display = "block"
    p.style.position = "absolute"
    p.style.right = "0"
    p.style.top = "0%"
    p.style.fontFamily = "monospace"
    p.style.padding = "0.4% 5% 0.4% 5%"
    p.style.backgroundColor = "rgba(10,10,10,1)"
    p.addEventListener("mouseover", function()
    {
        p.style.backgroundColor="rgba(20,20,20,1)";
        p.style.color = "rgba(200,0,0,1)"
        //ColumnChildMouseOver(section_left)
    });
    p.addEventListener("mouseleave", function()
    {
        p.style.backgroundColor="rgba(10,10,10,1)";
        p.style.color = "rgba(22,230,219,1)"
        //ColumnChildMouseLeave(section_left)
    });
    p.addEventListener("click", function()
    {
        CloseNUI();
    });
    var text = document.createTextNode("X");
    p.appendChild(text);
    header.appendChild(p);
}