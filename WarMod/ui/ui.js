var header = document.getElementById("header")

var sec3 = document.getElementById("threesec")
var sec2 = document.getElementById("twosec")


var section_left = document.getElementById("threeleft")
var section_center = document.getElementById("threecenter")
var section_right = document.getElementById("threeright")
var right_one = document.getElementById("threerightone");
var right_two = document.getElementById("threerighttwo");

var section_left2 = document.getElementById("twoleft")
var section_right2 = document.getElementById("tworight")

var teams = ["Blackops","Marine"]
var units1 = ["Blackops 1","Blackops 2","Blackops 3","Blackops 4","Blackops 5"]
var units2 = ["Marine 1","Marine 2","Marine 3","Marine 4","Marine 5"]
var unitTypes = ["Assault","Support","Scout","Specialist"]
var roles = ["Commander", "Group leader","Soldier"]
var MenuList = ["Groups","Buildings","Units","Shop","Inventory"]
var ShopCategories = ["Weapons", "Vehicles", "Gears"]
var groups = ["Group 1","Group 2","Group 3","Group 4","Group 5","Group 6","Group 7","Group 8","Group 9","Group 10"]
var Items = ["MedKit","Armour","NightVision"]

var createUnit = [0,0,0,0]
var menu = 0
var roleConfirmed = false;
var teamUnits = [0,0,0,0,0,0,0,0]
var InventoryItems = [0,0,0]

CloseButton();
AddEventListeners(section_left2,"rgba(218,232,252,1)","rgba(190,202,219,1)","twoleft")
AddEventListeners(section_right2,"rgba(248,206,204,1)","rgba(191,159,157,1)", "tworight")
Hideobj(sec3);
GroupFunctions()
ColumnStyles();

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
        roleConfirmed = true;
    }
    if(data.action.includes("players")){
        var team1 = data.action.split(';')[1];
        var team2 = data.action.split(';')[2];
        CreatePlayersColumnRight(team1, team2);
    }
    if(data.action.includes("menuitems")){
        var objects = data.action.split(':');
        InventoryItems[0] = Number(objects[1])
        InventoryItems[1] = Number(objects[2])
        InventoryItems[2] = Number(objects[3])
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
        //ColumnChildMouseOver(section_center)
    });
    section_center.addEventListener("mouseleave", function()
    {
        section_center.style.backgroundColor="rgba(207, 207, 207, 0.2)";
        //ColumnChildMouseLeave(section_center)
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
            //Hideobj(section_right)
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
            //Hideobj(section_right)
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
        p.style.backgroundColor = "rgba(40,40,40,0.6)"
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
function ContinueButton(parentelement, cb, replaceText = "",param1,param2){
    var p = document.createElement("h3");
    p.addEventListener("mouseover", function(){p.style.color = "rgba(71,71,71,1)"});
    p.addEventListener("mouseleave", function(){p.style.color = "rgba(22,230,219,0.7)"});
    p.addEventListener("click", function(){
        for(var v of section_center.children){
            section_center.removeChild(section_center.firstChild)
        }
        Hideobj(section_center)
        p.style.color = "rgba(71,71,71,1)"
        cb(param1,param2);
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
    if(roleConfirmed === false) {
        MainScriptCallback( "role:" + createUnit[3].toString())
    }
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
    var menutext = ""
    var menutextend = true
    if(menuIndex === 0){menutext = "Groups"}
    else if(menuIndex === 1){menutext = "Buildings"}
    else if(menuIndex === 2){menutext = "Units"}
    else if(menuIndex === 3){menutext = "Shop"}
    else if(menuIndex === 4){menutext = "Inventory", menutextend=false}
    if(menutextend){menutext = menutext + " Menu"}
    var text = document.createTextNode(menutext);
    p.appendChild(text);
    section_left.appendChild(p);
    if(menuIndex===0){
        for(var i = 0; i< 10;i++){
            CElement(section_left,"h3", "Group " + (i+1).toString(),GroupFunctions,i+1)
        }
    }else if(menuIndex===1){
        
    }else if(menuIndex===2){
        MainScriptCallback("units")
        for(var i = 0; i< teamUnits.length;i++){
            CElement(section_left,"h3",teamUnits[i])
        }
    }else if(menuIndex===3){
        for(var i = 0; i < ShopCategories.length; i++){
            CElement(section_left,"h3",ShopCategories[i], ShopMenus, i)
        }
    }else if(menuIndex===4){
        Showobj(section_center)
        Inventory()
    }
    ContinueButton(section_left,CreateGameMenu,"Back")
}
function Inventory(){
    for(var child of section_center.children){
        try{section_center.removeChild(section_center.firstChild)}catch{}
    }
    var sec = document.createElement("SECTION")
    section_center.appendChild(sec)
    var posX = 5
    var posY = 5
    var posXOffset = 30
    var posYOffset = 25
    var message = "inventory:"
    if(InventoryItems[0]!=0){
        var sendMessage = message + "0"
        createShopElement(sec,"MedKit","Amount: " + InventoryItems[0].toString(),"",posX,posY,sendMessage.toString())
        posX = posX + posXOffset
        if(posX>posXOffset*3){
            posX = 5
            posY = posY + posYOffset
        }
    }
    if(InventoryItems[1]!=0){
        var sendMessage = message + "1"
        createShopElement(sec,"Armour","Amount: " + InventoryItems[1].toString(),"",posX,posY,sendMessage.toString())
        posX = posX + posXOffset
        if(posX>posXOffset*3){
            posX = 5
            posY = posY + posYOffset
        }
    }
    if(InventoryItems[2]!=0){
        var sendMessage = message + "2"
        createShopElement(sec,"NightVision","Amount: " + InventoryItems[2].toString(),"",posX,posY,sendMessage.toString())
        posX = posX + posXOffset
        if(posX>posXOffset*3){
            posX = 5
            posY = posY + posYOffset
        }
    }
}
function BuildingsMenu(){

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
        var text = document.createTextNode("Weapons");
        p.appendChild(text);
        section_left.appendChild(p);
        ShopWeaponsMenu()
    } else if(menu === 1){
        var text = document.createTextNode("Vehicles");
        p.appendChild(text);
        section_left.appendChild(p);
        ShopVehiclesMenu()
    } else if(menu === 2){
        var text = document.createTextNode("Gears");
        p.appendChild(text);
        section_left.appendChild(p);
        ShopGearsMenu()
    }else if(menu === 3){
        var text = document.createTextNode("Inventory");
        p.appendChild(text);
        section_left.appendChild(p);
    }
    ContinueButton(section_left,CreateMenu,"Back",3)
}
function ShopWeaponsMenu(){
    
    Showobj(section_center);
        for(var v of section_center.children){
            section_center.removeChild(section_center.firstChild)
        }
        var functions = ["Pistols", "Shotgun","SMG","LMG","Rifle","Sniper","Throwable","Launchers","Special"]
        
        for(var i = 0; i<functions.length;i++){
            CElement(section_left,"h3",functions[i], shopsShowElements,i+1)
        }
}
function shopsShowElements(category){
    var folder = `https://${GetParentResourceName()}/ui/images/`
    for(var child of section_center.children){
        try{section_center.removeChild(section_center.firstChild)}catch{}
    }
    var sec = document.createElement("SECTION")
    section_center.appendChild(sec)
    var posX = 5
    var posY = 5
    var posXOffset = 30
    var posYOffset = 25
    var file = ""
    var guns = []
    var prices = []
    var fileNames = []
    var message = "gun:"
    if(category === 1){
        guns = ["Ap Pistol","Combat Pistol","Pistol","Pistol 50","Revolver",
        "Revolver Mk2","Sns Pistol","Sns Pistol Mk2","Vintage Pistol","Marksman Pistol"]
        prices = [500,600,300,400,600,500,700,600,800,500]
        fileNames = ["appistol","combatpistol","pistol","pistol50","revolver",
        "revolver","snspistol","snspistol","vintagepistol","marksmanpistol"]
        folder = folder + "pistols/"
        message = message + "0:"
    }
    if(category === 2){
        guns = ["Assault Shotgun","Bullpup Shotgun","Heavy Shotgun", 
        "Musket","Pump Shotgun"]
        prices = [1200,900,1300,600,700]
        fileNames = ["assaultshotgun","bullpupshotgun","heavyshotgun", 
        "musket","pumpshotgun"]
        folder = folder + "shotguns/"
        message = message + "1:"
    }
    if(category === 3){
        guns = ["Assault SMG","Combat PDW","Machine Pistol", 
        "Micro SMG","Mini SMG","SMG","SMG Mk2"]
        prices = [1300,1300,900,1100,1000,1400,1800]
        fileNames = ["AssaultSMG","CombatPDW","MachinePistol", 
        "MicroSMG","MicroSMG","SMG","SMG"]
        folder = folder + "Smg/"
        message = message + "2:"
    }
    if(category === 4){
        guns = ["Combat MG","Combat MG Mk2","Gusenberg", 
        "MG"]
        prices = [1800,2300,1500,1700]
        fileNames = ["CombatMG","CombatMG","Gusenberg", 
        "MG"]
        folder = folder + "Lmg/"
        message = message + "3:"
    }
    if(category === 5){
        guns = ["Advanced Rifle","Assault Rifle","Assault Rifle Mk2", "Bullpup Rifle","Bullpup Rifle Mk2",
        "Carbine Rifle","Carbine Rifle Mk2","Compact Rifle","Special Carbine","Special Carbine Mk2"]
        prices = [1800,1500,2000,1700,2200,1800,2300,1400,1600,2100]
        fileNames = ["AdvancedRifle","AssaultRifle","AssaultRifle", "BullpupRifle","BullpupRifle",
        "CarbineRifle","CarbineRifle","CompactRifle","SpecialCarbine","SpecialCarbine"]
        folder = folder + "Rifle/"
        message = message + "4:"
    }
    if(category === 6){
        guns = ["Heavy Sniper","Heavy Sniper Mk2","Marksman Rifle", "MarksmanRifle Mk2","Sniper Rifle"]
        prices = [2200,3200,1800,2800,1500]
        fileNames = ["HeavySniper","HeavySniper","MarksmanRifle", "MarksmanRifle","SniperRifle"]
        folder = folder + "Sniper/"
        message = message + "5:"
    }
    if(category === 7){
        guns = ["BZGas","Grenade","Molotov", "Proximity Mine","Smoke Grenade","Sticky Bomb"]
        prices = [500,600,600,1000,400,1300]
        fileNames = ["BZGas","Grenade","Molotov", "ProximinityMine","SmokeGrenade","StickyBomb"]
        folder = folder + "Throwable/"
        message = message + "6:"
    }
    if(category === 8){
        guns = ["Compact Grenade Launcher","Homing Launcher","RPG"]
        prices = [3000,5000,4000]
        fileNames = ["CompactLauncher","HomingLauncher","RPG"]
        folder = folder + "Launchers/"
        message = message + "7:"
    }
    if(category === 9){
        guns = ["Fire Extinguisher","Flashlight","Knife", "PetrolCan","Wrench"]
        prices = [400,100,400,300,1000]
        fileNames = ["FireExtinguisher","Flashlight","Knife", "PetrolCan","Wrench"]
        folder = folder + "Special/"
        message = message + "8:"
    }
    for(var i = 0; i<guns.length;i++){
        file = folder + fileNames[i] +".png"
        var sendMessage = message + i.toString()
        createShopElement(sec,guns[i],"Price: " + prices[i].toString(),file.toString(),posX,posY,sendMessage)
        posX = posX + posXOffset
        if(posX>posXOffset*3){
            posX = 5
            posY = posY + posYOffset
        }
    }
}
function createShopElement(parent,text,subtext,imgLocation, divleft,divtop,mainscriptMessage){
    var div = document.createElement("div")
    div.style.display = "inline-block"
    div.style.position="absolute"
    div.style.left = divleft.toString() + "%"
    div.style.top = divtop.toString() + "%"
    div.style.padding = "1%"
    div.style.textAlign="center"
    div.style.width = "20%"
    div.style.height = "15%"
    div.addEventListener("mouseover", function(){
        div.style.backgroundColor = "rgba(0,0,0,0.6)"
    })
    div.addEventListener("mouseleave", function(){
        div.style.backgroundColor = ""
    })
    div.addEventListener("click", function(){
        MainScriptCallback(mainscriptMessage.toString())
    })
    if(imgLocation!= ""){
        var img = document.createElement("img")
        img.src = imgLocation
        div.appendChild(img)
    }
    var header = document.createElement("h3")
    var textnode = document.createTextNode(text)
    var subheader = document.createElement("h4")
    var subtext = document.createTextNode(subtext)
    header.appendChild(textnode)
    subheader.appendChild(subtext)
    div.appendChild(header)
    div.appendChild(subheader)
    parent.appendChild(div)
}
function ShopVehiclesMenu(){
    Showobj(section_center);
    for(var v of section_center.children){
        section_center.removeChild(section_center.firstChild)
    }
    var functions = ["Land Vehicles","Planes","Helicopters","Boats","Special"]
        
    for(var i = 0; i< functions.length; i++){
        CElement(section_left,"h3",functions[i],ShopVehiclesSecCenter,i+1)
    }
}
function ShopVehiclesSecCenter(category){
    for(var child of section_center.children){
        try{section_center.removeChild(section_center.firstChild)}catch{}
    }
    var sec = document.createElement("SECTION")
    section_center.appendChild(sec)
    var posX = 5
    var posY = 5
    var posXOffset = 30
    var posYOffset = 25
    var vehicles = []
    var prices = []
    var message = "vehicle:"
    if(category === 1){
        vehicles = ["Apc","Barracks","Barracks Semi","Barrage","Chernobog","Crusader","Half-Track",
        "Rhino","Vetir","Insurgent","Winky","Squaddie"]
        prices = [8000,4000,4500,6000,10000,3500,8500,15000,3000,4000,5000,1000]
        message = message + "1:"
    }
    if(category === 2){
        vehicles = ["Avenger","Bombushka","Hydra","Lazer","Molotok","Nokota","Starling",
        "Strikeforce","Titan","Tula","Volatol"]
        prices = [15000,18000,55000,40000,30000,25000,25000,30000,20000,25000,25000]
        message = message + "2:"
    }
    if(category === 3){
        vehicles = ["Akula","Annihilator","Annihilator Stealth","Cargobob","Hunter","Savage","Valkyrie"]
        prices = [25000,30000,35000,10000,45000,45000,20000]
        message = message + "3:"
    }
    if(category === 4){
        vehicles = ["Weaponized Dinghy","Patrol Boat","Seashark"]
        prices = [3000,6000,1000]
        message = message + "4:"
    }
    if(category === 5){
        vehicles = ["Anti-Aircraft","Bulldozer","Enduro","Manchez","Scorcher","Verus"]
        prices = [3000,3000,1000,1200,300,1300]
        message = message + "5:"
    }
    for(var i = 0; i<vehicles.length;i++){
        var sendMessage = message + i.toString()
        createShopElement(sec,vehicles[i],"Price: " + prices[i].toString(),"",posX,posY,sendMessage)
        posX = posX + posXOffset
        if(posX>posXOffset*3){
            posX = 5
            posY = posY + posYOffset
        }
    }
}
function ShopGearsMenu(action){
    if(action === 1){
        
    }
    else{
        var functions = ["Products"]
        
        for(var i of functions){
            CElement(section_left,"h3",i,CreateGearsMenu)
        }
    }
}
function CreateGearsMenu(){
    Showobj(section_center);
    for(var v of section_center.children){
        try{section_center.removeChild(section_center.firstChild)}catch{}
    }
    var sec = document.createElement("SECTION")
    section_center.appendChild(sec)
    var posX = 5
    var posY = 5
    var posXOffset = 30
    var posYOffset = 25
    var prices = [200,300,500]
    var message = "item:"
    for(var i = 0; i<Items.length;i++){
        var sendMessage = message + i.toString()
        createShopElement(sec,Items[i],"Price: " + prices[i].toString(),"",posX,posY,sendMessage)
        posX = posX + posXOffset
        if(posX>posXOffset*3){
            posX = 5
            posY = posY + posYOffset
        }
    }
}
function GroupFunctions(group){
    Showobj(section_center);
    var functions = ["Info", "Task","Units","Settings"]
    for(var v of section_center.children){
        section_center.removeChild(section_center.firstChild)
    }
    var pos = 6
    var posnext = 20
    var sec = document.createElement("SECTION")
    section_center.appendChild(sec)
    for(var i = 0; i<functions.length;i++){
        var text = functions[i]
        CObjCenter(sec,pos,posnext, i,text)
    }
}
function CObjCenter(parent,pos, posnext, element, text, size){
    
    var p = document.createElement("h1")
    p.style.display = "block"
    p.style.position = "absolute"
    p.style.padding = "0 5% 0 5%"
    p.addEventListener("mouseover", function(){
        p.style.color = "rgba(71,71,71,1)"
    })
    p.addEventListener("mouseleave", function(){
        p.style.color = "rgba(22,230,219,0.7)"
    })
    p.addEventListener("click", function(){
        for(var v of parent.children){
            v.style.backgroundColor = ""
        }
        p.style.backgroundColor = "rgba(71,71,71,0.6)"
    })
    p.addEventListener("click", function(){
        if(element===0){

        }else if(element === 1){

        }else if(element===2){

        }else{
            
        }
    })
    if(size>0){
        p.style.fontSize = size.toString() + "em"
    }
    p.style.left = (pos + (posnext * element)).toString() + "%"
    var ptext = document.createTextNode(text)
    p.appendChild(ptext)
    parent.appendChild(p)
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
            CElement(section_left,"h3",MenuList[0],CreateMenu, 0)
            CElement(section_left,"h3",MenuList[1],CreateMenu, 1)
            CElement(section_left,"h3",MenuList[3],CreateMenu, 3)
            CElement(section_left,"h3",MenuList[4],CreateMenu, 4)
        }
        else if(createUnit[3] == 2){
            CElement(section_left,"h3",MenuList[2],CreateMenu, 2)
            CElement(section_left,"h3",MenuList[3],CreateMenu, 3)
            CElement(section_left,"h3",MenuList[4],CreateMenu, 4)
        }
        else if(createUnit[3] == 3){
            CElement(section_left,"h3",MenuList[3],CreateMenu, 3)
            CElement(section_left,"h3",MenuList[4],CreateMenu, 4)
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
            else{

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
        for(var v of section_center.children){
            section_center.removeChild(section_center.firstChild)
        }
        Hideobj(section_center)
    });
    var text = document.createTextNode("X");
    p.appendChild(text);
    header.appendChild(p);
}
function CreatePlayersColumnRight(team1, team2){
    Showobj(section_right)
    for(var child of section_right.children){
        try{
            section_right.removeChild(firstChild);
        }
        catch{}
    }
    var sec1 = document.createElement("SECTION")
    sec1.id = "threerightone"
    sec1.style.border = "2px solid #000000"
    section_right.appendChild(sec1)
    var sec2 = document.createElement("SECTION")
    sec2.id = "threerighttwo"
    sec2.style.border = "2px solid #000000"
    section_right.appendChild(sec2)
    TeamList(team1, teams[0],sec1,2)
    TeamList(team2, teams[1],sec2,2)
}
function TeamList(data, team, parent, columns){

    if(columns === 2){
        var listOffset = 3
        var players = data.split(':');
        var h2 = document.createElement("h2");
        var h2text = document.createTextNode(team.toString());
        h2.appendChild(h2text);
        parent.appendChild(h2);
        for(var i = listOffset; i<players.length + listOffset; i+2){
            var unit = players[i-listOffset]
            var playerName = players[i-listOffset+1]
            playerListCObj(parent,"left",unit,i * 4)
            playerListCObj(parent,"right",playerName,i * 4)
        }
    }
    else if(columns === 3){

    }
}
function playerListCObj(parent, position, text, heightT){
    var p = document.createElement("h5")
        p.style.display = "block"
        p.style.position = "absolute"
        if(position === "left"){
            p.style.left = "0%"
            p.style.padding = "0 0 0 5%"
        }else if(position === "right"){
            p.style.right = "0%"
            p.style.padding = "0 5% 0 0"
        }else if(position === "center"){
            p.style.left = "40%"
            p.style.padding = "0 5% 0 5%"
        }
        p.style.cursor = "pointer";
        p.style.top = (heightT).toString() + "%"
        var ptext = document.createTextNode(text)
        p.appendChild(ptext);
        parent.appendChild(p);
}