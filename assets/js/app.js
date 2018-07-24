  
var auth = fb.auth();
auth.onAuthStateChanged(function(user) {
	if (user) {
		var storage = fb.storage();
		var storageRef = storage.ref();
		var storageName = storageRef.bucket;
		storageRef.child('837645259.mp4').getDownloadURL().then(function(url) {
			document.getElementsByName('video')[0].src = url;
		});
	} else {
		auth.signInAnonymously().catch(function(error) {
			if (error.code === 'auth/operation-not-allowed') {
				console.log('not-alllowed');
			}
		});
	}
});


var lp = {
	datas:{
		site:{
			all: document.getElementById('allsitecontent'),
			hidden: document.getElementById('hiddencontent')
		},
		lb:{
			trigger: document.getElementsByClassName('olb')
		},
		form:{
			checkbox: document.getElementsByClassName('checkbox')
		},
		terms:{
			allterms: document.getElementsByClassName('terms'),
			current: ""
		}
	},
	init:function(){
		this.form.checkbox.init();
		this.terms.init();
	},
	terms:{
		init:function(){
			var all = mylp.datas.terms.allterms;
			for(var i = 0, len=all.length; i < len; i++){
				var myterm = all[i];
				myterm.onclick = this.open;
			}
		},
		open: function(e){
			e.preventDefault();
			var tid = e.target.getAttribute('data-id');
			mylp.datas.site.all.style.display = "none";
			mylp.datas.site.hidden.style.display = "block";
			var terms = document.getElementById('brand'+tid);
			mylp.datas.terms.current = terms;
			terms.style.display = "block";
			window.scrollTo(0,0);
			terms.getElementsByClassName('close')[0].onclick = mylp.terms.close;
		},
		close: function(){
			var terms = mylp.datas.terms.current;
			terms.style.display = "none";
			mylp.datas.site.hidden.style.display = "none";
			mylp.datas.site.all.style.display = "block";
			window.scrollTo(0,0);
		}
	},
	form:{
		init: function(){
			
		},
		checkbox:{
			init: function(){
				var checkbox = mylp.datas.form.checkbox;
				for(var i=0, len=checkbox.length; i < len; i++){
					this.transform(checkbox[i]);
				}
			},
			transform:function(checkbox){
				var label = checkbox.getElementsByTagName('label')[0];
				var span= document.createElement('span');
				var text = checkbox.getElementsByTagName('a')[0];
				span.className = "checkmark";
				label.insertBefore(span,label.childNodes[2]);
				text.innerText += " and Privacy Policy";
			}
		}
	}
};
var mylp = lp;
window.onload = function(){ lp.init(); }