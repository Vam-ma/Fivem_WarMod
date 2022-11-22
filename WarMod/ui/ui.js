var col1 = "81,235,252"
var col2 = "71,71,71"
var col3 = "189,189,189"

var article = document.getElementById("article")
HeaderTxt(["WarMod"])
var teams = ["Blackops","Marine"]
var Units = ["Blackops 1","Blackops 2","Blackops 3","Blackops 4","Blackops 5","Marine 1","Marine 2","Marine 3","Marine 4","Marine 5"]
var UnitTypes = ["Assault","Support","Scout","Specialist"]
var Roles = ["Commander", "Group Leader", "Soldier"]
var MainMenu1 = ["Groups","Buildings","Shop","Inventory","Settings"]
var MainMenu2 = ["Units","Shop","Inventory","Settings"]

var CreateSoldier = [0,0,0,0]
TeamSelection("")

var btn = document.getElementById("closeNUIbtn")
    btn.addEventListener("mouseover",function(){
        btn.style.backgroundColor = `rgba(${col2},0.8)`
    })
    btn.addEventListener("mouseleave",function(){
        btn.style.backgroundColor = `rgba(${col3},0.8)`
    })
    btn.style.backgroundColor = `rgba(${col3},0.8)`

window.addEventListener("message", (event) =>{
    var data = event.data
    if(data.action === "playerlist"){

    }else if(data.action === "close"){
        Hideobj(article,true)
    }else if(data.action === "open"){
        Hideobj(article,false)
    }else if(data.action.includes("role")){
        var newRole = data.action.split(':')[1];
        CreateSoldier[3] = parseInt(newRole);
        if(creatCreateSoldiereUnit[3] == 1){
            AddHeaderText("Commander")
        } else if(CreateSoldier[3] == 2){
            AddHeaderText("Group Leader")
        } else if(CreateSoldier[3] == 3){
            AddHeaderText("Soldier")
        }
        roleConfirmed = true;
    }else if(data.action.includes("players")){
        var team1 = data.action.split(';')[1];
        var team2 = data.action.split(';')[2];
        CreatePlayersColumnRight(team1, team2);
    }else if(data.action.includes("menuitems")){
        var objects = data.action.split(':');
        InventoryItems = []
        InventoryItems.push[Number(objects[1]),Number(objects[2]),Number(objects[2])]
    }
})


function TeamSelection(optionalDestroy){
    if(optionalDestroy!=""){
        document.getElementById(optionalDestroy).remove()
        CreateSoldier[0] = 0
    }
    var teamsdiv = AddDiv(article,0,0,100,95,"","","")
    teamsdiv.id = "teamsdiv"
    var div = AddDiv(teamsdiv,0,25,50,50,col1,col2,CharacterSelection,"")
    var div2 = AddDiv(teamsdiv,50,25,50,50,col1,col2,CharacterSelection,"")
    
    AddText(div,"h1",teams[0],-5,-2,true,25,40,col2,col1,SetTeam,1)
    AddText(div2,"h1",teams[1],0,-2,true,25,40,col2,col1,SetTeam,2)
}
function SetTeam(team){
    CreateSoldier[0]=team
    var teamtext = teams[CreateSoldier[0]-1].toString()
    HeaderTxt(["WarMod",teamtext])
}
function CharacterSelection(optionalDestroy){
    if(optionalDestroy!=""){
        document.getElementById(optionalDestroy).remove();
        CreateSoldier[1] = 0
    }
    else{
        document.getElementById("teamsdiv").remove();
    }
    var unitsDiv = AddDiv(article,0,7,100,10,"",col3,"")
    unitsDiv.id = "unitsdiv"
    var index = 0
    if(CreateSoldier[0]===2)
    {
        index=5
    }
    var posX = 10;
    for(var i = index; i<index+5;i++){
        var button = AddText(unitsDiv,"h2",Units[i],posX,-2,true,1.5,1.5,col2,col1,SetCharacter,i+1)
        posX += 15
    }
    var button = AddText(unitsDiv,"h2","Continue",85,800,true,1.5,1.5,col2,col1,UnitTypeSelection, "")
    var buttonb = AddText(unitsDiv,"h2","Back",75,800,true,1.5,1.5,col2,col1,TeamSelection,"unitsdiv")
}
function SetCharacter(character){
    CreateSoldier[1] = character
    var message = `unit:${CreateSoldier[0]}:${CreateSoldier[1]}`
    MainScriptCallback(message)
}
function UnitTypeSelection(optionalDestroy){
    if(CreateSoldier[1]!=0){
        if(optionalDestroy!=""){
            document.getElementById(optionalDestroy).remove();
            CreateSoldier[2] = 0
        }
        else{
            document.getElementById("unitsdiv").remove();
        }
        var UnitTypeDiv = AddDiv(article,0,7,100,10,"",col3,"")
        UnitTypeDiv.id = "unittypediv"
        var posX = 10;
        for(var i = 0; i<UnitTypes.length;i++){
            var button = AddText(UnitTypeDiv,"h2",UnitTypes[i],posX,-2,true,1.5,1.5,col2,col1,SetUnitType,i+1)
            posX += 20
        }
        AddText(UnitTypeDiv,"h2","Continue",85,800,true,1.5,1.5,col2,col1,RoleSelection)
        AddText(UnitTypeDiv,"h2","Back",75,800,true,1.5,1.5,col2,col1,CharacterSelection,"unittypediv")
    }
}
function SetUnitType(type){
    CreateSoldier[2] = type
    message = `type:${CreateSoldier[2]}`
    MainScriptCallback(message)
}
function RoleSelection(){
    if(CreateSoldier[2]!=0){
        try{
            document.getElementById("unittypediv").remove();
        }catch{}
        var RolesDiv = AddDiv(article,0,7,100,10,"",col3,"")
        RolesDiv.id = "rolesdiv"
        var posX = 10;
        for(var i = 0; i< Roles.length; i++){
            AddText(RolesDiv,"h2",Roles[i],posX,-2,true,1.5,1.5,col2,col1,SetRole, i + 1)
            posX += 20
        }
        AddText(RolesDiv,"h2","Ready",85,800,true,1.5,1.5,col2,col1,AcceptSelections)
        AddText(RolesDiv,"h2","Back",75,800,true,1.5,1.5,col2,col1,UnitTypeSelection,"rolesdiv")
    }
}
function SetRole(role){
    CreateSoldier[3] = role
}
function AcceptSelections(){
    if(CreateSoldier[3]!=0){
        message = `role:${CreateSoldier[3]}`
        MainScriptCallback(message)
        document.getElementById("rolesdiv").remove();
        if(CreateSoldier[3]===1){
            CreateMenu("",MainMenu1)
        }
        else{CreateMenu("",MainMenu2)}
        
    }
}
function AddDiv(parent,posX,posY,width,height,hlcol,basecol,callback,param1,param2){
    var div = document.createElement("div")
    div.addEventListener("mouseover", function(){
        div.style.backgroundColor = `rgba(${hlcol},0.4)`
    })
    div.addEventListener("mouseleave", function(){
        if(basecol == ""){
            div.style.backgroundColor = ""
        }else{
            div.style.backgroundColor = `rgba(${basecol},0.4)`
        }
    })
    div.addEventListener("click", function(){
        if(callback!=""){
            callback(param1,param2)
        }
    })
    div.style.backgroundColor = `rgba(${basecol},0.8)`
    div.style.display = "block"
    div.style.position = "absolute"
    div.style.width = width.toString() + "%"
    div.style.height = height.toString() + "%"
    div.style.left = posX.toString() + "%"
    div.style.top = posY.toString() + "%"
    if(basecol == ""){
        div.style.backgroundColor = ""
    }else{
        div.style.backgroundColor = `rgba(${basecol},0.4)`
    }
    parent.appendChild(div)
    return div
}
function AddText(parent,elementType,text,posX,posY,isButton,paddingV,paddingH,hlcol,basecol,callback,param1,param2){
    var button = document.createElement(elementType)
    if(isButton){
        button.addEventListener("mouseover", function(){
            button.style.color = `rgba(${hlcol},1)`
        })
        button.addEventListener("mouseleave", function(){
            button.style.color =`rgba(${basecol},1)`
        })
        button.addEventListener("click", function(){
            for(var obj of parent.children){
                obj.style.backgroundColor = ""
            }
            button.style.backgroundColor =`rgba(${hlcol},1)`
            callback(param1,param2)
        })
    }
    button.style.display = "block"
    button.style.position = "absolute"
    button.style.color = `rgba(${basecol},1)`
    button.style.left = posX.toString() + "%"
    button.style.top = posY.toString() + "%"
    button.style.padding = `${paddingV}% ${paddingH}% ${paddingV}% ${paddingH}%`
    var text = document.createTextNode(text)
    button.appendChild(text)
    parent.appendChild(button)
    return button
}
function AddObject(parent,elementType,text,additionalText,posX,posY,width,height,isButton,paddingV,paddingH,hlcol,basecol,callback,param1,param2){
    var div = document.createElement("div")
    var button = document.createElement(elementType)
    if(isButton){
        div.addEventListener("mouseover", function(){
            div.style.color = `rgba(${hlcol},0.8)`
            button.style.color = `rgba(${basecol},1)`
        })
        div.addEventListener("mouseleave", function(){
            div.style.color = `rgba(${basecol},0.8)`
            div.style.backgroundColor = ""
            button.style.color = `rgba(${hlcol},1)`
        })
        div.addEventListener("click", function(){
            for(var obj of parent.children){
                obj.style.backgroundColor = ""
            }
            div.style.backgroundColor =`rgba(${hlcol},0.8)`
            button.style.color = `rgba(${basecol},1)`
            callback(param1,param2)
        })
    }
    div.style.display = "block"
    div.style.position = "absolute"
    div.style.color = `rgba(${basecol},0.8)`
    div.style.left = posX.toString() + "%"
    div.style.top = posY.toString() + "%"
    div.style.width = width.toString() + "%"
    div.style.height = height.toString() + "%"
    div.style.padding = `${paddingV}% ${paddingH}% ${paddingV}% ${paddingH}%`
    button.style.color = `rgba(${hlcol},1)`
    var text = document.createTextNode(text)
    button.appendChild(text)
    div.appendChild(button)
    if(additionalText!=""){
        var additional = document.createElement("h4")
        var atext = document.createTextNode(additionalText)
        additional.style.color = `rgba(${basecol},1)`
        additional.appendChild(atext)
        div.appendChild(additional)
    }
    parent.appendChild(div)
    return button
}
function HeaderTxt(text){
    var header = document.getElementById("header")
    for(var child of header.children){
        header.removeChild(header.lastChild)
    }
    header.style.backgroundColor = `rgba(${col1},0.8)`
    var posX = 80
    var offset = 20
    for(var v of text){
        AddText(header,"h1",v,posX,0,false,0,0,"",col2)
        posX-=offset
    }
}
function openNav() {
    document.getElementById("myNav").style.width = "25%";
    MainScriptCallback("players",WritePlayers)
}
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
function WritePlayers(message){
    var players = message.split(':')
    for(var i = 0; i< players.length; i++){
        var obj = document.getElementById(`p${i}`)
        obj.innerHTML = players[i];
    }
}
function MainScriptCallback(message, callback){
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
            if(callback!=""){
                callback(resp)
            }
            else{
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
                else if(resp.includes("Inventory")){
                    var msg = resp.split(';')[1]
                    MenuFunctions(MainMenu1[3],msg)
                }
                else{
    
                }
            }
        } 
        
    );
    }
    catch{
        console.log("Can't send message to main script")
    }
}
function Hideobj(obj, bool){
    if(bool === true){obj.style.display = "none"}
    else{obj.style.display = "block"}
}
function CreateMenu(optionalName,objects){
    try{
        document.getElementById("menudiv").remove()
    }catch{}
    var div = AddDiv(article,0,7,25,93,col3,"","")
    div.id = "menudiv"
    var text ="Menu"
    if(optionalName!=""){text = optionalName}
    AddText(div,"h1",text,25,5,false,2,3,"",col2)
    var posY = 15
    for(var i = 0; i<objects.length;i++){
        AddText(div,"h3",objects[i],20,posY,true,2,5,col1,col3,MenuFunctions,objects[i],"")
        posY+=5
    }
    if(CreateSoldier[3]===1){AddText(div,"h2","Return",60,90,true,1,5,col1,col3,CreateMenu,"",MainMenu1)}
    else{AddText(div,"h2","Return",60,90,true,1,5,col1,col3,CreateMenu,"",MainMenu1)}
}
function MenuFunctions(menu,optionalMenuItems){
    try{
        document.getElementById("shoppanel").remove()
    }catch{}
    var weaponTypes = ["Pistols","Shotguns","SMG","LMG","Rifle","Sniper","Throwable","Launchers","Special"]
    var vehicleTypes = ["Land Vehicles","Planes","Helicopters","Boats","Special Vehicles"]
    var newMenu = []
    if(menu == MainMenu1[0]){                           //TODO
        newMenu = ["Group 1","Group 2","Group 3","Group 4","Group 5","Group 6","Group 7","Group 8","Group 9","Group 10"]
        CreateMenu("Groups",newMenu)
    }else if(menu == MainMenu1[1]){                     //TODO
        newMenu = ["Production","Defensive","Misc"]
        CreateMenu("Buildings",newMenu)
    }else if(menu == MainMenu2[0]){                     //TODO
        if(optionalMenuItems == ""){
            MainScriptCallback("Units","")
        }
        else{
            newMenu = optionalMenuItems.split(':')
            CreateMenu("Units",newMenu)
        }
    }else if(menu == MainMenu1[2]){                     //Testing
        newMenu = ["Weapons","Vehicles","Gears"]
        CreateMenu("Shop",newMenu)
    }else if(menu == MainMenu1[3]){
        newMenu = []
        if(optionalMenuItems == ""){
            MainScriptCallback("Inventory","")
        }
        else{                                           //Testing
            var itemcounts = optionalMenuItems.split(':')
            while(itemcounts.length<3){
                itemcounts.push("0")
            }
            ShopPanel(menu,itemcounts)
        }
        CreateMenu("Inventory",newMenu)
    }else if(menu == MainMenu1[4]){                     //TODO
        newMenu = ["Team","Role","Character","Type"]
        CreateMenu("Settings",newMenu)
    }else if(menu == "Weapons"){
        newMenu = weaponTypes
        CreateMenu("Weapons",newMenu)
    }else if(menu == "Vehicles"){
        newMenu = vehicleTypes
        CreateMenu("Vehicles",newMenu)
    }else if(menu == "Gears"){
        newMenu = ["Products"]
        CreateMenu("Gears",newMenu)
    }else if(menu == "Team"){
        CreateSoldier = [0,0,0,0]
        TeamSelection("menudiv")
    }else if(menu == "Role"){
        try{
            document.getElementById("menudiv").remove()
        }catch{}
        CreateSoldier[3] = 0
        RoleSelection()
    }else if(menu == "Character"){
        if(CreateSoldier[0]==1){
            newMenu = [Units[0],Units[1],Units[2],Units[3],Units[4]]
        }
        else{
            newMenu = [Units[5],Units[6],Units[7],Units[8],Units[9]]
        }
        CreateMenu("Select Character",newMenu)
    }else if(menu == "Type"){
        newMenu = UnitTypes
        CreateMenu("Select Type",newMenu)
    }else if(UnitTypes.includes(menu)){
        CreateSoldier[2] = UnitTypes.indexOf(menu) + 1
        console.log(CreateSoldier[2])
        message = `type:${CreateSoldier[2]}`
        MainScriptCallback(message)
    }else if(Units.includes(menu)){
        var index = Units.indexOf(menu) + 1
        CreateSoldier[1] = index
        console.log(Units.indexOf(menu) + " " + CreateSoldier[1].toString())
        var message = `unit:${CreateSoldier[0]}:${CreateSoldier[1]}`
        MainScriptCallback(message)
    }else{
        ShopPanel(menu)
    }
}
function ShopPanel(menu,additionalList){
    var Pistols = ["Ap Pistol","Combat Pistol","Pistol","Pistol 50","Revolver",
    "Revolver Mk2","Sns Pistol","Sns Pistol Mk2","Vintage Pistol","Marksman Pistol"]
    var pistolPrices = [500,600,300,400,600,500,700,600,800,500]
    var Shotguns = ["Assault Shotgun","Bullpup Shotgun","Heavy Shotgun", 
    "Musket","Pump Shotgun"]
    var shotgunPrices = [1200,900,1300,600,700]
    var SMG = ["Assault SMG","Combat PDW","Machine Pistol", 
    "Micro SMG","Mini SMG","SMG","SMG Mk2"]
    var smgPrices = [1300,1300,900,1100,1000,1400,1800]
    var LMG = ["Combat MG","Combat MG Mk2","Gusenberg", 
    "MG"]
    var lmgPrices = [1800,2300,1500,1700]
    var Rifle = ["Advanced Rifle","Assault Rifle","Assault Rifle Mk2", "Bullpup Rifle","Bullpup Rifle Mk2",
    "Carbine Rifle","Carbine Rifle Mk2","Compact Rifle","Special Carbine","Special Carbine Mk2"]
    var riflePrices = [1800,1500,2000,1700,2200,1800,2300,1400,1600,2100]
    var Sniper = ["Heavy Sniper","Heavy Sniper Mk2","Marksman Rifle", "MarksmanRifle Mk2","Sniper Rifle"]
    var sniperPrices = [2200,3200,1800,2800,1500]
    var Throwable = ["BZGas","Grenade","Molotov", "Proximity Mine","Smoke Grenade","Sticky Bomb"]
    var throwablePrices = [500,600,600,1000,400,1300]
    var Launchers = ["Compact Grenade Launcher","Homing Launcher","RPG"]
    var launcherPrices = [3000,5000,4000]
    var Special = ["Fire Extinguisher","Flashlight","Knife", "PetrolCan","Wrench"]
    var specialPrices = [400,100,400,300,1000]
    var LandVehicles = ["Apc","Barracks","Barracks Semi","Barrage","Chernobog","Crusader","Half-Track",
    "Rhino","Vetir","Insurgent","Winky","Squaddie"]
    var landvehiclePrices = [8000,4000,4500,6000,10000,3500,8500,15000,3000,4000,5000,1000]
    var Planes = ["Avenger","Bombushka","Hydra","Lazer","Molotok","Nokota","Starling",
    "Strikeforce","Titan","Tula","Volatol"]
    var planePrices = [15000,18000,55000,40000,30000,25000,25000,30000,20000,25000,25000]
    var Helicopters = ["Akula","Annihilator","Annihilator Stealth","Cargobob","Hunter","Savage","Valkyrie"]
    var helicopterPrices = [25000,30000,35000,10000,45000,45000,20000]
    var Boats = ["Weaponized Dinghy","Patrol Boat","Seashark"]
    var boatPrices = [3000,6000,1000]
    var SpecialVehicles = ["Anti-Aircraft","Bulldozer","Enduro","Manchez","Scorcher","Verus"]
    var specialvehPrices = [3000,3000,1000,1200,300,1300]
    var Gears = ["MedKit","Armour","NightVision"]
    var gearPrices = [200,300,500]
    if(menu == "Pistols"){
        CreateShopPanel(Pistols,pistolPrices, menu, true)
    }else if(menu == "Shotguns"){
        CreateShopPanel(Shotguns, shotgunPrices, menu, true)
    }else if(menu == "SMG"){
        CreateShopPanel(SMG, smgPrices, menu, true)
    }else if(menu == "LMG"){
        CreateShopPanel(LMG, lmgPrices, menu, true)
    }else if(menu == "Rifle"){
        CreateShopPanel(Rifle, riflePrices, menu, true)
    }else if(menu == "Sniper"){
        CreateShopPanel(Sniper, sniperPrices, menu, true)
    }else if(menu == "Throwable"){
        CreateShopPanel(Throwable, throwablePrices, menu, true)
    }else if(menu == "Launchers"){
        CreateShopPanel(Launchers, launcherPrices, menu, true)
    }else if(menu == "Special"){
        CreateShopPanel(Special, specialPrices, menu, true)
    }else if(menu == "Land Vehicles"){
        CreateShopPanel(LandVehicles, landvehiclePrices, menu, true)
    }else if(menu == "Planes"){
        CreateShopPanel(Planes, planePrices, menu, true)
    }else if(menu == "Helicopters"){
        CreateShopPanel(Helicopters, helicopterPrices, menu, true)
    }else if(menu == "Boats"){
        CreateShopPanel(Boats, boatPrices, menu, true)
    }else if(menu == "Special Vehicles"){
        CreateShopPanel(SpecialVehicles, specialvehPrices, menu, true)
    }else if(menu == "Products"){
        CreateShopPanel(Gears, gearPrices, menu, true)
    }else if(menu == MainMenu1[3]){
        CreateShopPanel(Gears, additionalList, menu, false)
    }
}
function CreateShopPanel(products, counts, menu, isPrice){
    try{
        document.getElementById("shoppanel").remove()
    }catch{}
    var div = AddDiv(article,25,7,75,93,col3,"","")
    div.id = "shoppanel"
    var posX = 5
    var posY = 5
    for(var i = 0; i<products.length;i++){
        if(isPrice==true){AddObject(div,"h2",products[i],`Price: ${counts[i]}`,posX,posY,15,15,true,2,2,col1,col3,BuyObject,menu,i)}
        else{AddObject(div,"h2",products[i],`${counts[i]} kpl`,posX,posY,15,15,true,2,2,col1,col3,BuyObject,menu,i)}
        posX+=30
        if(posX>=90){
            posX = 5
            posY += 20
        }
    }
}
function BuyObject(menu,index){
    if(menu == "Pistols"){
        var message = "gun:0:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == "Shotguns"){
        var message = "gun:1:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == "SMG"){
        var message = "gun:2:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == "LMG"){
        var message = "gun:3:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == "Rifle"){
        var message = "gun:4:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == "Sniper"){
        var message = "gun:5:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == "Throwable"){
        var message = "gun:6:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == "Launchers"){
        var message = "gun:7:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == "Special"){
        var message = "gun:8:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == "Land Vehicles"){
        var message = "vehicle:1:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == "Planes"){
        var message = "vehicle:2:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == "Helicopters"){
        var message = "vehicle:3:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == "Boats"){
        var message = "vehicle:4:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == "Special Vehicles"){
        var message = "vehicle:5:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == "Products"){
        var message = "item:" + index.toString();
        MainScriptCallback(message,"")
    }else if(menu == MainMenu1[3]){
        MainScriptCallback(`inventory:${index}`,"")
        MainScriptCallback("Inventory","")
    }
}
function CloseNUI(){
    MainScriptCallback('close')
    Hideobj(article, true)
}