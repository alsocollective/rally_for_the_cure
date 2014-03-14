var deskTop = false,
	tablet = false,
	phone = true;

setMarginTop();

if(deskTop){
	skrollr.init({
		forceHeight: false
	});
}


var carousel_sliding=false,
	carousel_conatiner=false,
	windowHeight=$(window).outerHeight(),
	scrolling = false,
	showing_nav=false,
	slideMenu = false,
	winWidth = 0;

checkPhoneHeight();

$(document).ready(function() {
	carousel_conatiner = $("#carousel");

	$(".slide").click(newSlide);
	$(".slide-nav").click(navSlideClick)
	$(".nav-clicker").click(menu_nav_click);
	$("#click-away").click(hideNavMenue);
	// $(".section").waypoint(setURLOnScroll);

	// Desktop Only!
	if(deskTop){
		$("#dimond").click(function(){
			scrollFromCarocel("down");
		});
		$("#nav-button").click(toggleOut);
		$("#about").waypoint(hide_carocel);
		$("#map").waypoint(loadGoogleMaps);
		$("#sponsors").waypoint(fadeInSponsers,{
			offset:100
		});
		$("#sponsors").waypoint(hideNavMenue,{
			offset:-50
		});
		if($(window).scrollTop()<50 ){ //TODO add detection and scrolling to location based of url
			$("#carousel").waypoint(scrollFromCarocel,{
				offset:-100
			});
		}
		// nav colours
		$("#attenders").waypoint(nav_yellow_white);
		$("#map").waypoint(nav_white_blue);
		$("#sponsors").waypoint(nav_blue_yellow)
		$(document).scrollsnap({
			snaps: '.snap',
			proximity: 100,
			offset:2
		});
	} else if(tablet) {


	} else if(phone){
		slideMenu = $("#nav-container").pullSlider({inmode:true,debug:false});
		setUpMap();
		moveContact();
	}


});


$(window).load(function(){
	if(phone){
		console.log("yep "+ $("#nav-container").outerHeight())
		slideMenu.manualResize();
		slideMenu.refindHeight();
	}
	setTimeout(function(){
		$("#loading-screen").fadeOut('slow');
		setTimeout(function(){
			$(".heighlight").addClass('text');
		},1000)
	},1000);
});

function setURLOnScroll(event){
	if(this.id == "carousel" || this.id == "spacer"){
		setURL(" ");
		return false;
	}
	setURL(this.id);
}

function menu_nav_click(event){
	event.preventDefault();

	if(slideMenu && slideMenu.clickable()){
		event.preventDefault
		return false;
	}
	if(phone){
		slideMenu.refindHeight();
	}
	var link = this.href.split("/");
	if(link[link.length-1] == "contact"){
		$("#contact").toggleClass('scroll-in').toggleClass('scroll-out');
	} else {
		setURL(link);
		animateScroll("#"+link[link.length-1]);
	}
	toggleOut(event);
	return false;
}
function hideNavMenue(){
	if(!showing_nav){
		$("#contact").toggleClass('scroll-in').toggleClass('scroll-out');
		showing_nav = true;
		setTimeout(function(){
			showing_nav = false;
		},1000);
	}
}



// NAVIGATION
function toggleOut(){
	var nav = $("#nav")
	if(nav.hasClass('slideout')){
		nav.removeClass('slideout');
		setTimeout(toggleTall,1000);
	} else {
		nav.addClass('slideout');
		setTimeout(toggleTall,1000);
	}
}
function toggleTall(){
	var nav = $("#nav")
	if(nav.hasClass('tall')){
		nav.removeClass('tall')
	} else {
		nav.addClass('tall')
	}
}


// CAROUSEL
function navSlideClick(e){
	if(carousel_sliding){
		return false;
	}
	$("#carousel .active").removeClass('active');
	$(this).addClass('active');
	var ElNum = this.id;
	changeSlide($($("#carousel .heighlight")[0]),$($("#carousel").children()[parseInt(ElNum)]))
}



// control function
function newSlide(e){
	var curSlide = $(this),
	nextSlide = getNextSlide(curSlide);
	nextCaroselNav();
	changeSlide(curSlide,nextSlide);
}

function nextCaroselNav(){
	if(carousel_sliding){
		return false;
	}
	var current = $("#carousel .active");
	current.removeClass('active');
	if(current.is(":last-child")){
		$($("#carousel-nav").children()[0]).addClass('active');
	} else {
		current.next().addClass('active');
	}
}

function changeSlide(elOld,elNew){
	if(carousel_sliding){
		return false;
	}

	elOld.removeClass('heighlight');
	elOld.removeClass('text')
	makeSlideOff(elOld);

	elNew.addClass('heighlight');
	elNew.removeClass('off');
	fadeInText(elNew);
	waitOutCarosel();
}

function fadeInText(element){
	element = makeInToJqueryElementIfNeeded(element);
	setTimeout(function(){
		element.addClass('text');
	},1500);
}

function getNextSlide(curEl){
	curEl = makeInToJqueryElementIfNeeded(curEl);
	if(curEl.is(":last-child")){
		return $($(curEl[0].parentNode).children()[1]);
	}
	return curEl.next();
}

function makeSlideOff(element){
	element = makeInToJqueryElementIfNeeded(element);
	setTimeout(function(){
		element.addClass('off');
	},1000);
}

function waitOutCarosel(){
	carousel_sliding = true;
	setTimeout(function(){
		carousel_sliding = false;
	},1500);
}

function makeInToJqueryElementIfNeeded(el){
	if(!(el instanceof jQuery)){
		el = $(el);
	}
	return el;
}


function hide_carocel(direction){
	if(direction == "up"){
		carousel_conatiner.removeClass('dis-none');
	} else if(!carousel_conatiner.hasClass('dis-none')){
		carousel_conatiner.addClass('dis-none');
	}
}


function loadGoogleMaps(direction){
	if(direction == "down" && $("#map-container").children().length == 0 ){
		loadScript();
	}
}

var map;
var map_all_locations;
function gmaploaded() {

		var myLatlng = new google.maps.LatLng(43.8613492,-79.3667179);

		var mapOptions = {
			zoom: 13,
			center: myLatlng,
			scrollwheel: false,
			navigationControl: false,
			mapTypeControl: false,
			scaleControl: false,
			draggable: true,
			streetViewControl: false,
			streetViewControl: false,
			panControl:false,
			rotateControl:false,
			zoomControl:false,
			styles: [
				  {
				    "stylers": [
				      { "visibility": "off" }
				    ]
				  },{
				    "featureType": "water",
				    "elementType": "geometry.fill",
				    "stylers": [
				      { "visibility": "on" },
				      { "color": "#26264d" }
				    ]
				  },{
				    "featureType": "road.arterial",
				    "elementType": "geometry.fill",
				    "stylers": [
				      { "visibility": "on" },
				      { "color": "#4d4d72" }
				    ]
				  },{
				    "featureType": "landscape.natural",
				    "elementType": "geometry.fill",
				    "stylers": [
				      { "visibility": "on" },
				      { "color": "#ececf4" }
				    ]
				  },{
				    "featureType": "road.local",
				    "elementType": "geometry",
				    "stylers": [
				      { "visibility": "on" },
				      { "color": "#ffa07c" }
				    ]
				  },{
				    "featureType": "transit",
				    "stylers": [
				      { "color": "#d38080" }
				    ]
				  },{
				    "featureType": "road.highway",
				    "elementType": "geometry.fill",
				    "stylers": [
				      { "visibility": "on" },
				      { "color": "#ffa719" }
				    ]
				  },{
				    "featureType": "transit.station.airport",
				    "elementType": "geometry.fill",
				    "stylers": [
				      { "visibility": "on" },
				      { "color": "#2c2c5b" }
				    ]
				  },{
				    "featureType": "road",
				    "elementType": "labels.text",
				    "stylers": [
				      { "visibility": "on" }
				    ]
				  }
				]
		}


		map = new google.maps.Map(document.getElementById('map-container'), mapOptions);

		var locations = [
			makeIcon("Buttonville Hanger",[43.8613492,-79.3667179],"Meeting at Buttonville Airport Hanger 17A","guests"),
			makeIcon("Airport Parking",[43.8638698,-79.3661961],"180 Renfrew Drive","guests"),
			makeIcon("Buttonville Airport",[43.8610426,-79.368975],"CYKZ","pilots"),
			makeIcon("Peterborough Airport",[54.9880443,-85.4437069],"CYPO !might be wrong","pilots"),
			makeIcon("Edenvale Airport",[44.4439291,-79.9636755],"CNV8","pilots"),
			makeIcon("Lindsay Airport",[44.364022,-78.7827989],"CNFA !code name did not come up","pilots"),
			makeIcon("Oshawa Airport",[43.9245641,-78.8967467],"CYOO","pilots"),
			makeIcon("Kingston Airport",[44.2252428,-76.596066],"CYGK","pilots"),
			makeIcon("Driving Starting Point",[43.8783451,-79.4151566],"Bayview Secondary School,<br>10077 Bayview Avenue,<br>Richmond Hill ON<br>L4C 2L4","drivers")
			]
		map_all_locations = locations;
		if(!phone){
			makeLegend(locations);
		}
		setTimeout(function(){
			$("#map-loading").addClass('fade');
			setTimeout(function(){
				$("#map-loading").addClass('off');
			},1000);
		},1000);
}

function makeLegend(locations){
	var element = document.getElementById("map");
	var parent = document.createElement("ul");
	parent.id = "legend";
	element.appendChild(parent);
	for(var a = 0, max = locations.length; a < max; ++a){
		(function(){
			var data = locations[a];
			var localEl = document.createElement("li");
			localEl.className = data[3];
			var link = document.createElement("a");
			link.className = data[3];
			link.href = "#";
			link.innerHTML = data[1].title;
			localEl.appendChild(link);
			parent.appendChild(localEl);

			$(link).click(function(event){
				event.preventDefault();
				closeAllTabs();
				map.panTo(data[2]);
				data[0].open(map,data[1]);
				if(data[3] == "pilots"){
					map.setZoom(12);
				} else if(data[3] == "drivers"){
					map.setZoom(14);
				} else {
					map.setZoom(16);
				}
				return false;
			})
		})(a);
	}
	var localEl = document.createElement("li");
	localEl.id="controll-pannel";
	parent.appendChild(localEl);
	var plus = document.createElement("a"),
	minus = document.createElement("a");
	localEl.appendChild(plus);
	localEl.appendChild(minus);
	plus.innerHTML = "+";
	$(plus).click(function(){
		map.setZoom(map.getZoom()+1);
	})
	minus.innerHTML = "-";
	$(minus).click(function(){
		map.setZoom(map.getZoom()-1);
	})
}

function closeAllTabs(){
	for(var a = 0, max = map_all_locations.length; a < max; ++a){
		map_all_locations[a][0].close();
	}
}

function makeIcon(title,location,description,id){
	var location = new google.maps.LatLng(location[0],location[1]);

	var infowindow = new google.maps.InfoWindow({
		content: "<h2>"+title+"</h2><p>"+description+"</p>",
		display:false
	});

	var image = {
		url:'/assets/icons/icon-loc-'+id+'.png',
		size: new google.maps.Size(26, 47.5),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(26,47.5),
		scaledSize: new google.maps.Size(26,47.5)
	}

	var marker = new google.maps.Marker({
		position: location,
		map: map,
		title: title,
		icon: image
		// icon:{
		// 	path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
		// 	fillColor: 'yellow',
		// 	fillOpacity: 0.8,
		// 	scale: 0.1,
		// 	strokeColor: 'gold',
		// 	strokeWeight: 3
		// }
	});


	google.maps.event.addListener(marker, 'click', function() {
		closeAllTabs();
		map.panTo(location);
		if (isInfoWindowOpen(infowindow)){
			infowindow.close();
		} else {
			infowindow.open(map,marker);
		}
	});

	return [infowindow,marker,location,id];
}

function isInfoWindowOpen(infoWindow){
    var map = infoWindow.getMap();
    return (map !== null && typeof map !== "undefined");
}


function loadScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=gmaploaded';
	document.body.appendChild(script);
}


function fadeInSponsers(){
	setTimeout(function(){
		fadeInNext($(".sponsor"),0)
	},200)
}

function fadeInNext(list,count){
	$(list[count]).fadeIn('slow');
	count += 1;
	if(count > list.length){
		return false;
	}
	setTimeout(function(){
		fadeInNext(list,count);
	},500)
}


function scrollFromCarocel(direction){
	if(scrolling){
		return false;
	}
	if(direction == "down"){
		$('html, body').animate({
			scrollTop: $("#about").offset().top
		}, 1000);
	}
}



function nav_yellow_white(dir){
	if(dir == "up"){
		$("body").removeClass('white-nav').addClass('yellow-nav')
	} else {
		$("body").removeClass('yellow-nav').addClass('white-nav')
	}
}
function nav_white_blue(dir){
	if(dir == "up"){
		$("body").removeClass('blue-nav').addClass('white-nav')
	} else {
		$("body").removeClass('white-nav').addClass('blue-nav')
	}
}
function nav_blue_yellow(dir){
	if(dir == "up"){
		$("body").removeClass('yellow-nav').addClass('blue-nav')
	} else {
		$("body").removeClass('blue-nav').addClass('yellow-nav')
	}
}

function setMarginTop(){
	$("#spacer").css({"margin-top":$(window).height()});
}

function animateScroll(element){
	if(scrolling){
		return false;
	}
	if(element){
		scrolling = true;
		$('html, body').animate({scrollTop :  $(element).offset().top},500,function(){
			scrolling = false;
		});
	} else {
		console.log("ERROR: No element passed into animateScroll");
	}
}


function setURL(location){
	if(Object.prototype.toString.call( location ) === '[object Array]'){
		location = location[location.length-1];
	}
	if (history && history.pushState) {;
		history.pushState(location,"",location);
	} else {
		window.location.replace("#"+location);
	}
}

function setUpMap(){
	var map = $("#map-loading")
	map.children()[0].innerHTML = "Tap to load map";
	map.click(loadMapOnClick);
}
function loadMapOnClick(){
	var el = $(this).children()[0];
	el.style.opacity = "0";
	setTimeout(function(){
		el.innerHTML = "Loading Map";
		el.style.opacity = "1";
		loadGoogleMaps("down");
	},500)
}
function moveContact(){
	$("#map").after($("#contact"));
}


function checkPhoneHeight(){
	if(!phone){
		return false;
	}
	var tempWidth = $(window).width()
	if(winWidth != tempWidth){
		$("body, html, #carousel").height($("body").height());
		winWidth = tempWidth;
	}
}


