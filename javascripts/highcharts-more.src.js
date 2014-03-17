(function(e,t){function L(e,t,n){this.init.call(this,e,t,n)}var n=e.arrayMin,r=e.arrayMax,i=e.each,s=e.extend,o=e.merge,u=e.map,a=e.pick,f=e.pInt,l=e.getOptions().plotOptions,c=e.seriesTypes,h=e.extendClass,p=e.splat,d=e.wrap,v=e.Axis,m=e.Tick,g=e.Point,y=e.Pointer,b=e.TrackerMixin,w=e.CenteredSeriesMixin,E=e.Series,S=Math,x=S.round,T=S.floor,N=S.max,C=e.Color,k=function(){};s(L.prototype,{init:function(e,t,n){var r=this,s,u=r.defaultOptions;r.chart=t;if(t.angular){u.background={}}r.options=e=o(u,e);s=e.background;if(s){i([].concat(p(s)).reverse(),function(e){var t=e.backgroundColor;e=o(r.defaultBackgroundOptions,e);if(t){e.backgroundColor=t}e.color=e.backgroundColor;n.options.plotBands.unshift(e)})}},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"silver",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#FFF"],[1,"#DDD"]]},from:Number.MIN_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"}});var A=v.prototype,O=m.prototype;var M={getOffset:k,redraw:function(){this.isDirty=false},render:function(){this.isDirty=false},setScale:k,setCategories:k,setTitle:k};var _={isRadial:true,defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,plotBands:[],tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,plotBands:[],showLastLabel:false,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},plotBands:[],showLastLabel:false,title:{x:4,text:null,rotation:90}},setOptions:function(e){this.options=o(this.defaultOptions,this.defaultRadialOptions,e)},getOffset:function(){A.getOffset.call(this);this.chart.axisOffset[this.side]=0;this.center=this.pane.center=w.getCenter.call(this.pane)},getLinePath:function(e,t){var n=this.center;t=a(t,n[2]/2-this.offset);return this.chart.renderer.symbols.arc(this.left+n[0],this.top+n[1],t,t,{start:this.startAngleRad,end:this.endAngleRad,open:true,innerR:0})},setAxisTranslation:function(){A.setAxisTranslation.call(this);if(this.center){if(this.isCircular){this.transA=(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1)}else{this.transA=this.center[2]/2/(this.max-this.min||1)}if(this.isXAxis){this.minPixelPadding=this.transA*this.minPointOffset+(this.reversed?(this.endAngleRad-this.startAngleRad)/4:0)}else{this.minPixelPadding=0}}},beforeSetTickPositions:function(){if(this.autoConnect){this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0}},setAxisSize:function(){A.setAxisSize.call(this);if(this.isRadial){this.center=this.pane.center=e.CenteredSeriesMixin.getCenter.call(this.pane);this.len=this.width=this.height=this.isCircular?this.center[2]*(this.endAngleRad-this.startAngleRad)/2:this.center[2]/2}},getPosition:function(e,t){if(!this.isCircular){t=this.translate(e);e=this.min}return this.postTranslate(this.translate(e),a(t,this.center[2]/2)-this.offset)},postTranslate:function(e,t){var n=this.chart,r=this.center;e=this.startAngleRad+e;return{x:n.plotLeft+r[0]+Math.cos(e)*t,y:n.plotTop+r[1]+Math.sin(e)*t}},getPlotBandPath:function(e,t,n){var r=this.center,i=this.startAngleRad,s=r[2]/2,o=[a(n.outerRadius,"100%"),n.innerRadius,a(n.thickness,10)],l=/%$/,c,h,p,d=this.isCircular,v;if(this.options.gridLineInterpolation==="polygon"){v=this.getPlotLinePath(e).concat(this.getPlotLinePath(t,true))}else{if(!d){o[0]=this.translate(e);o[1]=this.translate(t)}o=u(o,function(e){if(l.test(e)){e=f(e,10)*s/100}return e});if(n.shape==="circle"||!d){c=-Math.PI/2;h=Math.PI*1.5;p=true}else{c=i+this.translate(e);h=i+this.translate(t)}v=this.chart.renderer.symbols.arc(this.left+r[0],this.top+r[1],o[0],o[0],{start:c,end:h,innerR:a(o[1],o[0]-o[2]),open:p})}return v},getPlotLinePath:function(e,t){var n=this,r=n.center,s=n.chart,o=n.getPosition(e),u,a,f,l;if(n.isCircular){l=["M",r[0]+s.plotLeft,r[1]+s.plotTop,"L",o.x,o.y]}else if(n.options.gridLineInterpolation==="circle"){e=n.translate(e);if(e){l=n.getLinePath(0,e)}}else{u=s.xAxis[0];l=[];e=n.translate(e);f=u.tickPositions;if(u.autoConnect){f=f.concat([f[0]])}if(t){f=[].concat(f).reverse()}i(f,function(t,n){a=u.getPosition(t,e);l.push(n?"L":"M",a.x,a.y)})}return l},getTitlePosition:function(){var e=this.center,t=this.chart,n=this.options.title;return{x:t.plotLeft+e[0]+(n.x||0),y:t.plotTop+e[1]-{high:.5,middle:.25,low:0}[n.align]*e[2]+(n.y||0)}}};d(A,"init",function(e,n,r){var i=this,u=n.angular,f=n.polar,l=r.isX,c=u&&l,h,d,v,m,g=n.options,y=r.pane||0,b,w;if(u){s(this,c?M:_);h=!l;if(h){this.defaultRadialOptions=this.defaultRadialGaugeOptions}}else if(f){s(this,_);h=l;this.defaultRadialOptions=l?this.defaultRadialXOptions:o(this.defaultYAxisOptions,this.defaultRadialYOptions)}e.call(this,n,r);if(!c&&(u||f)){m=this.options;if(!n.panes){n.panes=[]}this.pane=b=n.panes[y]=n.panes[y]||new L(p(g.pane)[y],n,i);w=b.options;n.inverted=false;g.chart.zoomType=null;this.startAngleRad=d=(w.startAngle-90)*Math.PI/180;this.endAngleRad=v=(a(w.endAngle,w.startAngle+360)-90)*Math.PI/180;this.offset=m.offset||0;this.isCircular=h;if(h&&r.max===t&&v-d===2*Math.PI){this.autoConnect=true}}});d(O,"getPosition",function(e,t,n,r,i){var s=this.axis;return s.getPosition?s.getPosition(n):e.call(this,t,n,r,i)});d(O,"getLabelPosition",function(e,t,n,r,i,s,o,u,f){var l=this.axis,c=s.y,h,p=s.align,d=(l.translate(this.pos)+l.startAngleRad+Math.PI/2)/Math.PI*180%360;if(l.isRadial){h=l.getPosition(this.pos,l.center[2]/2+a(s.distance,-25));if(s.rotation==="auto"){r.attr({rotation:d})}else if(c===null){c=l.chart.renderer.fontMetrics(r.styles.fontSize).b-r.getBBox().height/2}if(p===null){if(l.isCircular){if(d>20&&d<160){p="left"}else if(d>200&&d<340){p="right"}else{p="center"}}else{p="center"}r.attr({align:p})}h.x+=s.x;h.y+=c}else{h=e.call(this,t,n,r,i,s,o,u,f)}return h});d(O,"getMarkPath",function(e,t,n,r,i,s,o){var u=this.axis,a,f;if(u.isRadial){a=u.getPosition(this.pos,u.center[2]/2+r);f=["M",t,n,"L",a.x,a.y]}else{f=e.call(this,t,n,r,i,s,o)}return f});l.arearange=o(l.area,{lineWidth:1,marker:null,threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.low}</b> - <b>{point.high}</b><br/>'},trackByArea:true,dataLabels:{verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}});c.arearange=h(c.area,{type:"arearange",pointArrayMap:["low","high"],toYData:function(e){return[e.low,e.high]},pointValKey:"low",getSegments:function(){var e=this;i(e.points,function(t){if(!e.options.connectNulls&&(t.low===null||t.high===null)){t.y=null}else if(t.low===null&&t.high!==null){t.y=t.high}});E.prototype.getSegments.call(this)},translate:function(){var e=this,t=e.yAxis;c.area.prototype.translate.apply(e);i(e.points,function(e){var n=e.low,r=e.high,i=e.plotY;if(r===null&&n===null){e.y=null}else if(n===null){e.plotLow=e.plotY=null;e.plotHigh=t.translate(r,0,1,0,1)}else if(r===null){e.plotLow=i;e.plotHigh=null}else{e.plotLow=i;e.plotHigh=t.translate(r,0,1,0,1)}})},getSegmentPath:function(e){var t,n=[],r=e.length,i=E.prototype.getSegmentPath,s,o,u,a=this.options,f=a.step,l;t=HighchartsAdapter.grep(e,function(e){return e.plotLow!==null});while(r--){s=e[r];if(s.plotHigh!==null){n.push({plotX:s.plotX,plotY:s.plotHigh})}}u=i.call(this,t);if(f){if(f===true){f="left"}a.step={left:"right",center:"center",right:"left"}[f]}l=i.call(this,n);a.step=f;o=[].concat(u,l);l[0]="L";this.areaPath=this.areaPath.concat(u,l);return o},drawDataLabels:function(){var e=this.data,t=e.length,n,r=[],i=E.prototype,s=this.options.dataLabels,o,u=this.chart.inverted;if(s.enabled||this._hasPointLabels){n=t;while(n--){o=e[n];o.y=o.high;o.plotY=o.plotHigh;r[n]=o.dataLabel;o.dataLabel=o.dataLabelUpper;o.below=false;if(u){s.align="left";s.x=s.xHigh}else{s.y=s.yHigh}}if(i.drawDataLabels){i.drawDataLabels.apply(this,arguments)}n=t;while(n--){o=e[n];o.dataLabelUpper=o.dataLabel;o.dataLabel=r[n];o.y=o.low;o.plotY=o.plotLow;o.below=true;if(u){s.align="right";s.x=s.xLow}else{s.y=s.yLow}}if(i.drawDataLabels){i.drawDataLabels.apply(this,arguments)}}},alignDataLabel:function(){c.column.prototype.alignDataLabel.apply(this,arguments)},getSymbol:c.column.prototype.getSymbol,drawPoints:k});l.areasplinerange=o(l.arearange);c.areasplinerange=h(c.arearange,{type:"areasplinerange",getPointSpline:c.spline.prototype.getPointSpline});(function(){var e=c.column.prototype;l.columnrange=o(l.column,l.arearange,{lineWidth:1,pointRange:null});c.columnrange=h(c.arearange,{type:"columnrange",translate:function(){var t=this,n=t.yAxis,r;e.translate.apply(t);i(t.points,function(e){var i=e.shapeArgs,s=t.options.minPointLength,o,u,a;e.plotHigh=r=n.translate(e.high,0,1,0,1);e.plotLow=e.plotY;a=r;u=e.plotY-r;if(u<s){o=s-u;u+=o;a-=o/2}i.height=u;i.y=a})},trackerGroups:["group","dataLabels"],drawGraph:k,pointAttrToOptions:e.pointAttrToOptions,drawPoints:e.drawPoints,drawTracker:e.drawTracker,animate:e.animate,getColumnMetrics:e.getColumnMetrics})})();l.gauge=o(l.line,{dataLabels:{enabled:true,y:15,borderWidth:1,borderColor:"silver",borderRadius:3,crop:false,style:{fontWeight:"bold"},verticalAlign:"top",zIndex:2},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:false});var D=h(g,{setState:function(e){this.state=e}});var P={type:"gauge",pointClass:D,angular:true,drawGraph:k,fixedBox:true,forceDL:true,trackerGroups:["group","dataLabels"],translate:function(){var e=this,t=e.yAxis,n=e.options,r=t.center;e.generatePoints();i(e.points,function(e){var i=o(n.dial,e.dial),s=f(a(i.radius,80))*r[2]/200,u=f(a(i.baseLength,70))*s/100,l=f(a(i.rearLength,10))*s/100,c=i.baseWidth||3,h=i.topWidth||1,p=t.startAngleRad+t.translate(e.y,null,null,null,true);if(n.wrap===false){p=Math.max(t.startAngleRad,Math.min(t.endAngleRad,p))}p=p*180/Math.PI;e.shapeType="path";e.shapeArgs={d:i.path||["M",-l,-c/2,"L",u,-c/2,s,-h/2,s,h/2,u,c/2,-l,c/2,"z"],translateX:r[0],translateY:r[1],rotation:p};e.plotX=r[0];e.plotY=r[1]})},drawPoints:function(){var e=this,t=e.yAxis.center,n=e.pivot,r=e.options,s=r.pivot,u=e.chart.renderer;i(e.points,function(t){var n=t.graphic,i=t.shapeArgs,s=i.d,a=o(r.dial,t.dial);if(n){n.animate(i);i.d=s}else{t.graphic=u[t.shapeType](i).attr({stroke:a.borderColor||"none","stroke-width":a.borderWidth||0,fill:a.backgroundColor||"black",rotation:i.rotation}).add(e.group)}});if(n){n.animate({translateX:t[0],translateY:t[1]})}else{e.pivot=u.circle(0,0,a(s.radius,5)).attr({"stroke-width":s.borderWidth||0,stroke:s.borderColor||"silver",fill:s.backgroundColor||"black"}).translate(t[0],t[1]).add(e.group)}},animate:function(e){var t=this;if(!e){i(t.points,function(e){var n=e.graphic;if(n){n.attr({rotation:t.yAxis.startAngleRad*180/Math.PI});n.animate({rotation:e.shapeArgs.rotation},t.options.animation)}});t.animate=null}},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);E.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:function(e,t){E.prototype.setData.call(this,e,false);this.processData();this.generatePoints();if(a(t,true)){this.chart.redraw()}},drawTracker:b.drawTrackerPoint};c.gauge=h(c.line,P);l.boxplot=o(l.column,{fillColor:"#FFFFFF",lineWidth:1,medianWidth:2,states:{hover:{brightness:-.3}},threshold:null,tooltip:{pointFormat:'<span style="color:{series.color};font-weight:bold">{series.name}</span><br/>'+"Maximum: {point.high}<br/>"+"Upper quartile: {point.q3}<br/>"+"Median: {point.median}<br/>"+"Lower quartile: {point.q1}<br/>"+"Minimum: {point.low}<br/>"},whiskerLength:"50%",whiskerWidth:2});c.boxplot=h(c.column,{type:"boxplot",pointArrayMap:["low","q1","median","q3","high"],toYData:function(e){return[e.low,e.q1,e.median,e.q3,e.high]},pointValKey:"high",pointAttrToOptions:{fill:"fillColor",stroke:"color","stroke-width":"lineWidth"},drawDataLabels:k,translate:function(){var e=this,t=e.yAxis,n=e.pointArrayMap;c.column.prototype.translate.apply(e);i(e.points,function(e){i(n,function(n){if(e[n]!==null){e[n+"Plot"]=t.translate(e[n],0,1,0,1)}})})},drawPoints:function(){var e=this,n=e.points,r=e.options,s=e.chart,o=s.renderer,u,f,l,c,h,p,d,v,m,g,y,b,w,E,S,N,C,k,L,A,O,M,_=e.doQuartiles!==false,D=parseInt(e.options.whiskerLength,10)/100;i(n,function(n){m=n.graphic;O=n.shapeArgs;y={};E={};N={};M=n.color||e.color;if(n.plotY!==t){u=n.pointAttr[n.selected?"selected":""];C=O.width;k=T(O.x);L=k+C;A=x(C/2);f=T(_?n.q1Plot:n.lowPlot);l=T(_?n.q3Plot:n.lowPlot);c=T(n.highPlot);h=T(n.lowPlot);y.stroke=n.stemColor||r.stemColor||M;y["stroke-width"]=a(n.stemWidth,r.stemWidth,r.lineWidth);y.dashstyle=n.stemDashStyle||r.stemDashStyle;E.stroke=n.whiskerColor||r.whiskerColor||M;E["stroke-width"]=a(n.whiskerWidth,r.whiskerWidth,r.lineWidth);N.stroke=n.medianColor||r.medianColor||M;N["stroke-width"]=a(n.medianWidth,r.medianWidth,r.lineWidth);N["stroke-linecap"]="round";d=y["stroke-width"]%2/2;v=k+A+d;g=["M",v,l,"L",v,c,"M",v,f,"L",v,h,"z"];if(_){d=u["stroke-width"]%2/2;v=T(v)+d;f=T(f)+d;l=T(l)+d;k+=d;L+=d;b=["M",k,l,"L",k,f,"L",L,f,"L",L,l,"L",k,l,"z"]}if(D){d=E["stroke-width"]%2/2;c=c+d;h=h+d;w=["M",v-A*D,c,"L",v+A*D,c,"M",v-A*D,h,"L",v+A*D,h]}d=N["stroke-width"]%2/2;p=x(n.medianPlot)+d;S=["M",k,p,"L",L,p,"z"];if(m){n.stem.animate({d:g});if(D){n.whiskers.animate({d:w})}if(_){n.box.animate({d:b})}n.medianShape.animate({d:S})}else{n.graphic=m=o.g().add(e.group);n.stem=o.path(g).attr(y).add(m);if(D){n.whiskers=o.path(w).attr(E).add(m)}if(_){n.box=o.path(b).attr(u).add(m)}n.medianShape=o.path(S).attr(N).add(m)}}})}});l.errorbar=o(l.boxplot,{color:"#000000",grouping:false,linkedTo:":previous",tooltip:{pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.low}</b> - <b>{point.high}</b><br/>'},whiskerWidth:null});c.errorbar=h(c.boxplot,{type:"errorbar",pointArrayMap:["low","high"],toYData:function(e){return[e.low,e.high]},pointValKey:"high",doQuartiles:false,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||c.column.prototype.getColumnMetrics.call(this)}});l.waterfall=o(l.column,{lineWidth:1,lineColor:"#333",dashStyle:"dot",borderColor:"#333"});c.waterfall=h(c.column,{type:"waterfall",upColorProp:"fill",pointArrayMap:["low","y"],pointValKey:"y",init:function(e,t){t.stacking=true;c.column.prototype.init.call(this,e,t)},translate:function(){var e=this,t=e.options,n=e.yAxis,r,i,s,o,u,a,f,l,h,p=t.threshold,d=t.borderWidth%2/2;c.column.prototype.translate.apply(this);l=p;s=e.points;for(i=0,r=s.length;i<r;i++){o=s[i];u=o.shapeArgs;a=e.getStack(i);h=a.points[e.index];if(isNaN(o.y)){o.y=e.yData[i]}f=N(l,l+o.y)+h[0];u.y=n.translate(f,0,1);if(o.isSum||o.isIntermediateSum){u.y=n.translate(h[1],0,1);u.height=n.translate(h[0],0,1)-u.y}else{l+=a.total}if(u.height<0){u.y+=u.height;u.height*=-1}o.plotY=u.y=x(u.y)-d;u.height=x(u.height);o.yBottom=u.y+u.height}},processData:function(e){var t=this,n=t.options,r=t.yData,i=t.points,s,o=r.length,u=n.threshold||0,a,f,l,c,h,p;f=a=l=c=u;for(p=0;p<o;p++){h=r[p];s=i&&i[p]?i[p]:{};if(h==="sum"||s.isSum){r[p]=f}else if(h==="intermediateSum"||s.isIntermediateSum){r[p]=a;a=u}else{f+=h;a+=h}l=Math.min(f,l);c=Math.max(f,c)}E.prototype.processData.call(this,e);t.dataMin=l;t.dataMax=c},toYData:function(e){if(e.isSum){return"sum"}else if(e.isIntermediateSum){return"intermediateSum"}return e.y},getAttribs:function(){c.column.prototype.getAttribs.apply(this,arguments);var t=this,n=t.options,r=n.states,s=n.upColor||t.color,u=e.Color(s).brighten(.1).get(),a=o(t.pointAttr),f=t.upColorProp;a[""][f]=s;a.hover[f]=r.hover.upColor||u;a.select[f]=r.select.upColor||s;i(t.points,function(e){if(e.y>0&&!e.color){e.pointAttr=a;e.color=s}})},getGraphPath:function(){var e=this.data,t=e.length,n=this.options.lineWidth+this.options.borderWidth,r=x(n)%2/2,i=[],s="M",o="L",u,a,f,l;for(f=1;f<t;f++){a=e[f].shapeArgs;u=e[f-1].shapeArgs;l=[s,u.x+u.width,u.y+r,o,a.x,u.y+r];if(e[f-1].y<0){l[2]+=u.height;l[5]+=u.height}i=i.concat(l)}return i},getExtremes:k,getStack:function(e){var t=this.yAxis,n=t.stacks,r=this.stackKey;if(this.processedYData[e]<this.options.threshold){r="-"+r}return n[r][e]},drawGraph:E.prototype.drawGraph});l.bubble=o(l.scatter,{dataLabels:{inside:true,style:{color:"white",textShadow:"0px 0px 3px black"},verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1},minSize:8,maxSize:"20%",tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0});c.bubble=h(c.scatter,{type:"bubble",pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],bubblePadding:true,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor"},applyOpacity:function(e){var t=this.options.marker,n=a(t.fillOpacity,.5);e=e||t.fillColor||this.color;if(n!==1){e=C(e).setOpacity(n).get("rgba")}return e},convertAttribs:function(){var e=E.prototype.convertAttribs.apply(this,arguments);e.fill=this.applyOpacity(e.fill);return e},getRadii:function(e,t,n,r){var i,s,o,u=this.zData,a=[],f=this.options.sizeBy!=="width",l;for(s=0,i=u.length;s<i;s++){l=t-e;o=l>0?(u[s]-e)/(t-e):.5;if(f&&o>=0){o=Math.sqrt(o)}a.push(S.ceil(n+o*(r-n))/2)}this.radii=a},animate:function(e){var t=this.options.animation;if(!e){i(this.points,function(e){var n=e.graphic,r=e.shapeArgs;if(n&&r){n.attr("r",1);n.animate({r:r.r},t)}});this.animate=null}},translate:function(){var e,n=this.data,r,i,s=this.radii;c.scatter.prototype.translate.call(this);e=n.length;while(e--){r=n[e];i=s?s[e]:0;r.negative=r.z<(this.options.zThreshold||0);if(i>=this.minPxSize/2){r.shapeType="circle";r.shapeArgs={x:r.plotX,y:r.plotY,r:i};r.dlBox={x:r.plotX-i,y:r.plotY-i,width:2*i,height:2*i}}else{r.shapeArgs=r.plotY=r.dlBox=t}}},drawLegendSymbol:function(e,t){var n=f(e.itemStyle.fontSize)/2;t.legendSymbol=this.chart.renderer.circle(n,e.baseline-n,n).attr({zIndex:3}).add(t.legendGroup);t.legendSymbol.isMarker=true},drawPoints:c.column.prototype.drawPoints,alignDataLabel:c.column.prototype.alignDataLabel});v.prototype.beforePadding=function(){var e=this,s=this.len,o=this.chart,u=0,l=s,c=this.isXAxis,h=c?"xData":"yData",p=this.min,d={},v=S.min(o.plotWidth,o.plotHeight),m=Number.MAX_VALUE,g=-Number.MAX_VALUE,y=this.max-p,b=s/y,w=[];if(this.tickPositions){i(this.series,function(t){var s=t.options,o;if(t.bubblePadding&&t.visible){e.allowZoomOutside=true;w.push(t);if(c){i(["minSize","maxSize"],function(e){var t=s[e],n=/%$/.test(t);t=f(t);d[e]=n?v*t/100:t});t.minPxSize=d.minSize;o=t.zData;if(o.length){m=S.min(m,S.max(n(o),s.displayNegative===false?s.zThreshold:-Number.MAX_VALUE));g=S.max(g,r(o))}}}});i(w,function(e){var t=e[h],n=t.length,r;if(c){e.getRadii(m,g,d.minSize,d.maxSize)}if(y>0){while(n--){if(typeof t[n]==="number"){r=e.radii[n];u=Math.min((t[n]-p)*b-r,u);l=Math.max((t[n]-p)*b+r,l)}}}});if(w.length&&y>0&&a(this.options.min,this.userMin)===t&&a(this.options.max,this.userMax)===t){l-=s;b*=(s+u-l)/s;this.min+=u/b;this.max+=l/b}}};(function(){function r(e,t,n){e.call(this,t,n);if(this.chart.polar){this.closeSegment=function(e){var t=this.xAxis.center;e.push("L",t[0],t[1])};this.closedStacks=true}}function o(e,t){var n=this.chart,r=this.options.animation,i=this.group,s=this.markerGroup,o=this.xAxis.center,u=n.plotLeft,a=n.plotTop,f;if(n.polar){if(n.renderer.isSVG){if(r===true){r={}}if(t){f={translateX:o[0]+u,translateY:o[1]+a,scaleX:.001,scaleY:.001};i.attr(f);if(s){s.attrSetters=i.attrSetters;s.attr(f)}}else{f={translateX:u,translateY:a,scaleX:1,scaleY:1};i.animate(f,r);if(s){s.animate(f,r)}this.animate=null}}}else{e.call(this,t)}}var e=E.prototype,t=y.prototype,n;e.toXY=function(e){var t,n=this.chart,r=e.plotX,i=e.plotY;e.rectPlotX=r;e.rectPlotY=i;e.clientX=(r/Math.PI*180+this.xAxis.pane.options.startAngle)%360;t=this.xAxis.postTranslate(e.plotX,this.yAxis.len-i);e.plotX=e.polarPlotX=t.x-n.plotLeft;e.plotY=e.polarPlotY=t.y-n.plotTop};e.orderTooltipPoints=function(e){if(this.chart.polar){e.sort(function(e,t){return e.clientX-t.clientX});if(e[0]){e[0].wrappedClientX=e[0].clientX+360;e.push(e[0])}}};if(c.area){d(c.area.prototype,"init",r)}if(c.areaspline){d(c.areaspline.prototype,"init",r)}if(c.spline){d(c.spline.prototype,"getPointSpline",function(e,t,n,r){var i,s=1.5,o=s+1,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x;if(this.chart.polar){u=n.plotX;a=n.plotY;f=t[r-1];l=t[r+1];if(this.connectEnds){if(!f){f=t[t.length-2]}if(!l){l=t[1]}}if(f&&l){c=f.plotX;h=f.plotY;p=l.plotX;d=l.plotY;v=(s*u+c)/o;m=(s*a+h)/o;g=(s*u+p)/o;y=(s*a+d)/o;b=Math.sqrt(Math.pow(v-u,2)+Math.pow(m-a,2));w=Math.sqrt(Math.pow(g-u,2)+Math.pow(y-a,2));E=Math.atan2(m-a,v-u);S=Math.atan2(y-a,g-u);x=Math.PI/2+(E+S)/2;if(Math.abs(E-x)>Math.PI/2){x-=Math.PI}v=u+Math.cos(x)*b;m=a+Math.sin(x)*b;g=u+Math.cos(Math.PI+x)*w;y=a+Math.sin(Math.PI+x)*w;n.rightContX=g;n.rightContY=y}if(!r){i=["M",u,a]}else{i=["C",f.rightContX||f.plotX,f.rightContY||f.plotY,v||u,m||a,u,a];f.rightContX=f.rightContY=null}}else{i=e.call(this,t,n,r)}return i})}d(e,"translate",function(e){e.call(this);if(this.chart.polar&&!this.preventPostTranslate){var t=this.points,n=t.length;while(n--){this.toXY(t[n])}}});d(e,"getSegmentPath",function(e,t){var n=this.points;if(this.chart.polar&&this.options.connectEnds!==false&&t[t.length-1]===n[n.length-1]&&n[0].y!==null){this.connectEnds=true;t=[].concat(t,[n[0]])}return e.call(this,t)});d(e,"animate",o);d(e,"setTooltipPoints",function(e,t){if(this.chart.polar){s(this.xAxis,{tooltipLen:360})}return e.call(this,t)});if(c.column){n=c.column.prototype;d(n,"animate",o);d(n,"translate",function(e){var t=this.xAxis,n=this.yAxis.len,r=t.center,i=t.startAngleRad,s=this.chart.renderer,o,u,f,l;this.preventPostTranslate=true;e.call(this);if(t.isRadial){u=this.points;l=u.length;while(l--){f=u[l];o=f.barX+i;f.shapeType="path";f.shapeArgs={d:s.symbols.arc(r[0],r[1],n-f.plotY,null,{start:o,end:o+f.pointWidth,innerR:n-a(f.yBottom,n)})};this.toXY(f)}}});d(n,"alignDataLabel",function(t,n,r,i,s,o){if(this.chart.polar){var u=n.rectPlotX/Math.PI*180,a,f;if(i.align===null){if(u>20&&u<160){a="left"}else if(u>200&&u<340){a="right"}else{a="center"}i.align=a}if(i.verticalAlign===null){if(u<45||u>315){f="bottom"}else if(u>135&&u<225){f="top"}else{f="middle"}i.verticalAlign=f}e.alignDataLabel.call(this,n,r,i,s,o)}else{t.call(this,n,r,i,s,o)}})}d(t,"getIndex",function(e,t){var n,r=this.chart,i,s,o;if(r.polar){i=r.xAxis[0].center;s=t.chartX-i[0]-r.plotLeft;o=t.chartY-i[1]-r.plotTop;n=180-Math.round(Math.atan2(s,o)/Math.PI*180)}else{n=e.call(this,t)}return n});d(t,"getCoordinates",function(e,t){var n=this.chart,r={xAxis:[],yAxis:[]};if(n.polar){i(n.axes,function(e){var i=e.isXAxis,s=e.center,o=t.chartX-s[0]-n.plotLeft,u=t.chartY-s[1]-n.plotTop;r[i?"xAxis":"yAxis"].push({axis:e,value:e.translate(i?Math.PI-Math.atan2(o,u):Math.sqrt(Math.pow(o,2)+Math.pow(u,2)),true)})})}else{r=e.call(this,t)}return r})})()})(Highcharts)