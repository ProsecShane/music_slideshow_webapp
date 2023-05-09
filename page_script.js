function int_to_time(num) {
	return `${Math.floor(num / 60)}:${Math.floor((num % 60) / 10)}${Math.floor(num % 10)}`;
}

function get_track(n) {
	return document.getElementById(`music${n+1}`);
}

var playing = false;
var curtrack = 0;
var duration = ` / 3:51`;

function reset_music(n) {
	document.getElementById("music-button").style = `border-style: solid; border-width: 20px 0 20px 40px;`;
	get_track(n).currentTime = 0;
	get_track(n).pause()
	playing = false;
}

function start_music(n) {
	reset_music(0);
	reset_music(1);
	reset_music(2);

	document.getElementById("music-button").style = `border-style: double; border-width: 0px 0 0px 40px;`;
	get_track(n).play();
	curtrack = n;
	playing = true;
	duration = ` / ` + int_to_time(get_track(n).duration);
	document.getElementById("music-time").innerHTML = `0:00` + duration;
	document.getElementById("music-bar").max = get_track(n).duration;
	document.getElementById("music-bar").value = 0;
}

function toggle_music() {
	if (playing) {
		document.getElementById("music-button").style = `border-style: solid; border-width: 20px 0 20px 40px;`;
		get_track(curtrack).pause();
		playing = false;
	} else {
		document.getElementById("music-button").style = `border-style: double; border-width: 0px 0 0px 40px;`;
		get_track(curtrack).play();
		playing = true;
	}
}

function update_music_time() {
	document.getElementById("music-time").innerHTML = int_to_time(get_track(curtrack).currentTime) + duration;
	document.getElementById("music-bar").value = get_track(curtrack).currentTime;
}
var bar_updater = setInterval(update_music_time, 333);

function music_bar_input() {
	clearInterval(bar_updater);
	document.getElementById("music-time").innerHTML = int_to_time(document.getElementById("music-bar").value) + duration;
}
function music_bar_change() {
	bar_updater = setInterval(update_music_time, 333);
	document.getElementById("music-time").innerHTML = int_to_time(document.getElementById("music-bar").value) + duration;
	get_track(curtrack).currentTime = document.getElementById("music-bar").value;
}

var cur_image = 1;
var in_slideshow = false;
var ss_length = 3;

var slideshow_upd = setInterval(function () {}, ss_length * 1000);
clearInterval(slideshow_upd);

var img_desc = {
	1: "Школа Hope's Peak Academy из франшизы Danganronpa. Яркое, ясное и вселяющее надежду изображение.",
	2: "Долина в Швейцарии. На фото можно увидеть горные водопады, находящиеся рядом с небольшим поселением.",
	3: "Кадр из песни \"Scuffed Up Age\" исполнительницы Mori Calliope. Часть текста песни переводится как \"Завтра новый день\".",
	4: "Изображение ночного офиса с прекрасным видом на ночной город. Передается то неповторимое чувство работы в поздний час.",
	5: "Мистический лес. Дымка будто скрывает какие-то секреты, которые так и напрашиваются, чтобы их раскрыли, изучили.",
	6: "Скриншот из видеоигры Minecraft с модификацией \"Better End\". Освещение и композиция создают прекрасное изображение несмотря на кубическую структуру мира.",
	7: "Кадр из мультфильма \"Твоё имя\". Через ночное небо мчится метеорит, что является одним из главных сюжетных моментов произведения.",
	8: "Скриншот из видеоигры Minecraft. На изображении видно просторную обросшую пещеру, каждый угол которой так и хочется изучить.",
	9: "Фотография ночной улицы в Токио. Повсюду ярко сияющие вывески, каждая изо всех сил пытается привлечь внимание к себе.",
	10: "Скриншот игры \"Super Mario Odyssey\". Разваленные башни локации \"Заброшенное королевство\" дополняет силуэт дракона."
};

function change_image(num, from_button) {
	cur_image = (cur_image + num) % 10;
	cur_image = cur_image == 0 ? 10 : cur_image;
	document.getElementById("image-view").src = `images/${cur_image}.jpg`;
	document.getElementById("image-subtitle").innerHTML = img_desc[cur_image];
	if (from_button && in_slideshow) {
		clearInterval(slideshow_upd);
		slideshow_upd = setInterval(function () {change_image(1)}, ss_length * 1000);
	}
}

function toggle_slideshow() {
	if (in_slideshow) {
		document.getElementById("slideshow-button").style = `border-style: solid; border-width: 35px 0 35px 70px;`;
		in_slideshow = false;
		clearInterval(slideshow_upd);
	} else {
		document.getElementById("slideshow-button").style = `border-style: double; border-width: 0px 0 0px 70px;`;
		in_slideshow = true;
		slideshow_upd = setInterval(function () {change_image(1, false)}, ss_length * 1000);
	}
}

function update_timer() {
	ss_length = parseFloat(document.getElementById('timer').value);
	if (in_slideshow) {
		clearInterval(slideshow_upd);
		slideshow_upd = setInterval(function () {change_image(1)}, ss_length * 1000);
	}
}
