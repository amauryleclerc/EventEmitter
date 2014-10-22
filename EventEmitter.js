/*
Amaury LECLERC
LPSIL
*/
function EventEmitter(){	
		this.callbacks={};
  if (!(this instanceof EventEmitter)) {
		return new EventEmitter() 
  }
}
EventEmitter.prototype  ={
	on:function(event, fn){
		if(!this.callbacks.hasOwnProperty(event)){
			this.callbacks[event]=[];
		}
		this.callbacks[event].push({"fn":fn});
		return this;
	},
	off:function(event, fn){
		if(typeof event === "undefined"){
			this.callbacks = {};
		}
		if(this.callbacks.hasOwnProperty(event) ){
			if(typeof fn === "undefined"){
				delete this.callbacks[event];
			}else{
			var index = this.callbacks[event].map(function(e) { return e.fn; }).indexOf(fn);
		
				if (index > -1) {
					this.callbacks[event].splice(index, 1);
				}
			}
		}
		return this;
	},
	emit:function(event){
		
		var args = Array.prototype.slice.call(arguments, 1);
		if(this.callbacks.hasOwnProperty(event)){
			var tab = this.callbacks[event];
			var em = this;
			tab.forEach(function(fonc){
				fonc.fn.apply(null, args);;
				if(!(typeof fonc.num === "undefined") ){
					if(fonc.num ===1){
							em.off(event, fonc.fn);
					}else{
							fonc.num--;
					}
				}
			});
		}	
		return this;
	},
	time:function(event, num, fn){
		if(!this.callbacks.hasOwnProperty(event)){
			this.callbacks[event]=[];
		}
		this.callbacks[event].push({"fn":fn, "num":num} );
	
			
		return this;
	},
	once:function(event, fn){
		this.time(event, 1, fn);
		return this;
	}
}

