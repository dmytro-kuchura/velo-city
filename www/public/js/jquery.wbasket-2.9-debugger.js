/*
	wBasket v2.9 / core js file
	WEZOM Studio / Oleg Dutchenko
*/
(function($){
if (window.wBasket) {
	if (wBasket.debugg) {
		console.log('');
		console.warn('\ndebugger wBasket.js включен\n ');
		console.log('');

		/* private */

			var _notNull = function(object) {
					var flag = object+'' != 'null';
					return flag;
				},
				_isObject = function(object) {
					var flag = (typeof object == 'object' && _notNull(object));
					return flag;
				},
				_isString = function(string){
					var flag = typeof string == 'string';
					return flag;
				},
				_replaceStringR = function(str, text) {
					var string = str.replace(/\%r\%/, text);
					return string;
				},
				_replaceStringS = function(str, text) {
					var string = str.replace(/\%s\%/, text);
					return string;
				},
				_setTime = function(name) {
					var data = new Date();
					var dbgg = 'wBasket Debugger group: ';
					var h = data.getHours();
					var m = data.getMinutes();
					var s = data.getSeconds();
					if (m < 9) {
						m = '0'+m;
					}
					if (s < 9) {
						s = '0'+s;
					}
					var string = dbgg + h + ':' + m + ':' + s;
					console.group(string);
					console.time(name);
				};

			var _enter = '\n';
			var _enterEnd = '\n ';
			var _pref = '';
			//var _start = 'wBasket Debugger:\n'+_pref;
			var _start = _pref;
			var _sep = function() {
				console.log(' ');
			};
			var _cons = function(dataArray) {
				for (var i = 0; i < dataArray.length; i++) {
					console.warn(dataArray[i]);
				}
			};
			var txt;
			var timeName = 'workTime';

		/* Debugg */

			var Debugg = {
				txt: {
					'101': 'Полученные данные не содержат списка товаров \n\t{\n\t\t%r%: [array of items objects]\n\t}',
					'102': 'Элемент $("%r%") отсутствует на странице, корзина не вписана !!!',
					'103': 'Пользователь не определил действия коллбека %r%',
					'200': 'Инициализация !!!',
					'201': '%r% - ГОТОВО!',
					'202': 'Корзина - ОТРИСОВАНА!',
					'203': 'Запускаю коллбек %r%!',
					Read: 'Читаю полученные данные с запроса',
					Draw: 'Отрисовываю корзину',
					Write: 'Вписываю корзину в $("%r%")',
					buildHeader: 'Создаю хедер корзины',
					buildList: 'Создаю список товаров и наполняю',
					buildItem: 'Создаю товар',
					buildFooter: 'Создаю футер корзины'
				}
			}

		/* Debugg functions */
			Debugg['101'] = function(text) {
				console.error(_enter+_start+text+_enterEnd);
			};
			Debugg['102'] = function(text) {
				console.error(_enter+_start+text+_enterEnd);
			};

			Debugg['103'] = function(text) {
				_cons([_start+text]);
				console.log(' ');
			};

			Debugg['201'] = function(text, data) {
				_cons([_start+text, data]);
				console.log(' ');
			};

			Debugg['202'] = function(text, data) {
				_cons([_start+text, data]);
				console.log(' ');
			};

			Debugg['203'] = function(text) {
				_cons([_start+text]);
				console.log(' ');
			};

			Debugg.Read = function(responseData) {
				_cons([_start+txt.Read, responseData]);
				console.log(' ');
			};

			Debugg.Write = function(drawn, element) {
				var text = _replaceStringR(txt.Write, element);
				_cons([_start+text]);
				console.log(' ');
			};

			Debugg.buildHeader = function() {
				var dataObj = wBasket.structure.header;
				_cons([_start+txt.buildHeader, dataObj]);
			};

			Debugg.buildList = function() {
				var dataObj = wBasket.structure.list;
				_cons([_start+txt.buildList, dataObj]);
			};

			Debugg.buildFooter = function() {
				var dataObj = wBasket.structure.footer;
				_cons([_start+txt.buildFooter, dataObj]);
			};

		/* Extend wBasket.proto.debugg */
			wBasket.proto.debugg = function() {
				var ARG = this.debugg.arguments[0];
				var arg1 = ARG[0];
				if (arg1 == 'endDBG') {
					console.groupEnd();
					console.timeEnd(timeName);
				} else if (arg1 == 'startDBG') {
					_setTime(timeName);
				}
				var arg2 = ARG[1];
				var arg3 = ARG[2];
				var brunch;
				if (_isObject(arg1) && _isString(arg2)) {
					if (arg1.hasOwnProperty(arg2)) {
						brunch = arg1[arg2];
					}
				}
				if (brunch && Debugg.hasOwnProperty(arg2)) {
					var data = brunch.arguments;
					if (data+'' == 'null') {
						data = false;
					} else if (!data.length) {
						data = false;
					}
					if (data === false) {
						data = [arg2];
					}
					Debugg[arg2].apply(Debugg, data)
				}
				if (typeof arg1 == 'number') {
					var name = arg1+'';
					if (Debugg.hasOwnProperty(name)) {
						if (arg2) {
							var text = _replaceStringR(txt[name], arg2);
							text = _replaceStringS(text, arg2);
							if (arg3) {
								Debugg[name](text, arg3);
							} else {
								Debugg[name](text);
							}
						} else {
							Debugg[name](arg1);
						}
					}
				}
			};

		/* Definition */
			window.wBasketDebugg = Debugg;
			txt = window.wBasketDebugg.txt;

			for (var key in txt) {
				if (!Debugg.hasOwnProperty(key)) {
					Debugg[key] = function(keyName) {
						_cons([_start+txt[keyName]]);
						//console.log(keyName);
					}
				}
			}

	} else {
		console.log('');
		console.warn('\njquery.wbasket-2.9-debuger.js подключен на странице, но не используеться!\n ');
		console.log('');
	}
} else {
	console.log('');
	console.error('\nwBasket.js не подключен\n ');
	console.log('');
}
})(jQuery);