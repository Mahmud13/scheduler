/*

@license
dhtmlxScheduler v.5.2.3 Stardard
To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
Scheduler.plugin(function(e){e.config.limit_start=null,e.config.limit_end=null,e.config.limit_view=!1,e.config.check_limits=!0,e.config.mark_now=!0,e.config.display_marked_timespans=!0,e._temp_limit_scope=function(){function t(t,a,i,n,r){var o=e,d=[],l={_props:"map_to",matrix:"y_property"};for(var s in l){var _=l[s];if(o[s])for(var c in o[s]){var u=o[s][c],h=u[_];t[h]&&(d=o._add_timespan_zones(d,e._get_blocked_zones(a[c],t[h],i,n,r)))}}
return d=o._add_timespan_zones(d,e._get_blocked_zones(a,"global",i,n,r))}var a=null,i="dhx_time_block",n="default",r=function(e,t,a){return t instanceof Date&&a instanceof Date?(e.start_date=t,e.end_date=a):(e.days=t,e.zones=a),e},o=function(e,t,a){var n="object"==typeof e?e:{days:e};return n.type=i,n.css="",t&&(a&&(n.sections=a),n=r(n,e,t)),n};e.blockTime=function(t,a,i){var n=o(t,a,i);return e.addMarkedTimespan(n)},e.unblockTime=function(t,a,i){a=a||"fullday";var n=o(t,a,i)
;return e.deleteMarkedTimespan(n)},e.attachEvent("onBeforeViewChange",function(t,a,i,n){function r(t,a){var i=e.config.limit_start,n=e.config.limit_end,r=e.date.add(t,1,a);return t.valueOf()>n.valueOf()||r<=i.valueOf()}return!e.config.limit_view||(n=n||a,i=i||t,!r(n,i)||a.valueOf()==n.valueOf())||(setTimeout(function(){var t=r(a,i)?e.config.limit_start:a;e.setCurrentView(r(t,i)?null:t,i)},1),!1)}),e.checkInMarkedTimespan=function(a,i,r){i=i||n
;for(var o=!0,d=new Date(a.start_date.valueOf()),l=e.date.add(d,1,"day"),s=e._marked_timespans;d<a.end_date;d=e.date.date_part(l),l=e.date.add(d,1,"day")){var _=+e.date.date_part(new Date(d)),c=d.getDay(),u=t(a,s,c,_,i);if(u)for(var h=0;h<u.length;h+=2){var p=e._get_zone_minutes(d),v=a.end_date>l||a.end_date.getDate()!=d.getDate()?1440:e._get_zone_minutes(a.end_date),m=u[h],g=u[h+1];if(m<v&&g>p&&!(o="function"==typeof r&&r(a,p,v,m,g)))break}}return!o};var d=e.checkLimitViolation=function(t){
if(!t)return!0;if(!e.config.check_limits)return!0;var a=e,n=a.config,r=[];if(t.rec_type)for(var o=e.getRecDates(t),d=0;d<o.length;d++){var l=e._copy_event(t);e._lame_copy(l,o[d]),r.push(l)}else r=[t];for(var s=!0,_=0;_<r.length;_++){var c=!0,l=r[_];l._timed=e.isOneDayEvent(l),c=!n.limit_start||!n.limit_end||l.start_date.valueOf()>=n.limit_start.valueOf()&&l.end_date.valueOf()<=n.limit_end.valueOf(),c&&(c=!e.checkInMarkedTimespan(l,i,function(e,t,i,n,r){var o=!0
;return t<=r&&t>=n&&((1440==r||i<r)&&(o=!1),e._timed&&a._drag_id&&"new-size"==a._drag_mode?(e.start_date.setHours(0),e.start_date.setMinutes(r)):o=!1),(i>=n&&i<r||t<n&&i>r)&&(e._timed&&a._drag_id&&"new-size"==a._drag_mode?(e.end_date.setHours(0),e.end_date.setMinutes(n)):o=!1),o})),c||(c=a.checkEvent("onLimitViolation")?a.callEvent("onLimitViolation",[l.id,l]):c),s=s&&c}return s||(a._drag_id=null,a._drag_mode=null),s};e._get_blocked_zones=function(e,t,a,i,n){var r=[]
;if(e&&e[t])for(var o=e[t],d=this._get_relevant_blocked_zones(a,i,o,n),l=0;l<d.length;l++)r=this._add_timespan_zones(r,d[l].zones);return r},e._get_relevant_blocked_zones=function(e,t,a,i){return a[t]&&a[t][i]?a[t][i]:a[e]&&a[e][i]?a[e][i]:[]},e.attachEvent("onMouseDown",function(e){return!(e==i)}),e.attachEvent("onBeforeDrag",function(t){return!t||d(e.getEvent(t))}),e.attachEvent("onClick",function(t,a){return d(e.getEvent(t))}),e.attachEvent("onBeforeLightbox",function(t){var i=e.getEvent(t)
;return a=[i.start_date,i.end_date],d(i)}),e.attachEvent("onEventSave",function(t,a,i){if(!a.start_date||!a.end_date){var n=e.getEvent(t);a.start_date=new Date(n.start_date),a.end_date=new Date(n.end_date)}if(a.rec_type){var r=e._lame_clone(a);return e._roll_back_dates(r),d(r)}return d(a)}),e.attachEvent("onEventAdded",function(t){if(!t)return!0;var a=e.getEvent(t)
;return!d(a)&&e.config.limit_start&&e.config.limit_end&&(a.start_date<e.config.limit_start&&(a.start_date=new Date(e.config.limit_start)),a.start_date.valueOf()>=e.config.limit_end.valueOf()&&(a.start_date=this.date.add(e.config.limit_end,-1,"day")),a.end_date<e.config.limit_start&&(a.end_date=new Date(e.config.limit_start)),a.end_date.valueOf()>=e.config.limit_end.valueOf()&&(a.end_date=this.date.add(e.config.limit_end,-1,"day")),
a.start_date.valueOf()>=a.end_date.valueOf()&&(a.end_date=this.date.add(a.start_date,this.config.event_duration||this.config.time_step,"minute")),a._timed=this.isOneDayEvent(a)),!0}),e.attachEvent("onEventChanged",function(t){if(!t)return!0;var i=e.getEvent(t);if(!d(i)){if(!a)return!1;i.start_date=a[0],i.end_date=a[1],i._timed=this.isOneDayEvent(i)}return!0}),e.attachEvent("onBeforeEventChanged",function(e,t,a){return d(e)}),e.attachEvent("onBeforeEventCreated",function(t){
var a=e.getActionData(t).date,i={_timed:!0,start_date:a,end_date:e.date.add(a,e.config.time_step,"minute")};return d(i)}),e.attachEvent("onViewChange",function(){e._mark_now()}),e.attachEvent("onAfterSchedulerResize",function(){return window.setTimeout(function(){e._mark_now()},1),!0}),e.attachEvent("onTemplatesReady",function(){e._mark_now_timer=window.setInterval(function(){e._is_initialized()&&e._mark_now()},6e4)}),e._mark_now=function(t){var a="dhx_now_time";this._els[a]||(this._els[a]=[])
;var i=e._currentDate(),n=this.config;if(e._remove_mark_now(),!t&&n.mark_now&&i<this._max_date&&i>this._min_date&&i.getHours()>=n.first_hour&&i.getHours()<n.last_hour){var r=this.locate_holder_day(i);this._els[a]=e._append_mark_now(r,i)}},e._append_mark_now=function(t,a){var i="dhx_now_time",n=e._get_zone_minutes(a),r={zones:[n,n+1],css:i,type:i};if(!this._table_view){if(this._props&&this._props[this._mode]){var o,d,l=this._props[this._mode],s=l.size||l.options.length
;l.days>1?(l.size&&l.options.length&&(t=(l.position+t)/l.options.length*l.size),o=t,d=t+s):(o=0,d=o+s);for(var _=[],c=o;c<d;c++){var u=c;r.days=u;var h=e._render_marked_timespan(r,null,u)[0];_.push(h)}return _}return r.days=t,e._render_marked_timespan(r,null,t)}if("month"==this._mode)return r.days=+e.date.date_part(a),e._render_marked_timespan(r,null,null)},e._remove_mark_now=function(){for(var e="dhx_now_time",t=this._els[e],a=0;a<t.length;a++){var i=t[a],n=i.parentNode;n&&n.removeChild(i)}
this._els[e]=[]},e._marked_timespans={global:{}},e._get_zone_minutes=function(e){return 60*e.getHours()+e.getMinutes()},e._prepare_timespan_options=function(t){var a=[],i=[];if("fullweek"==t.days&&(t.days=[0,1,2,3,4,5,6]),t.days instanceof Array){for(var r=t.days.slice(),o=0;o<r.length;o++){var d=e._lame_clone(t);d.days=r[o],a.push.apply(a,e._prepare_timespan_options(d))}return a}if(!t||!(t.start_date&&t.end_date&&t.end_date>t.start_date||void 0!==t.days&&t.zones)&&!t.type)return a
;var l=0,s=1440;"fullday"==t.zones&&(t.zones=[l,s]),t.zones&&t.invert_zones&&(t.zones=e.invertZones(t.zones)),t.id=e.uid(),t.css=t.css||"",t.type=t.type||n;var _=t.sections;if(_){for(var c in _)if(_.hasOwnProperty(c)){var u=_[c];u instanceof Array||(u=[u]);for(var o=0;o<u.length;o++){var h=e._lame_copy({},t);h.sections={},h.sections[c]=u[o],i.push(h)}}}else i.push(t);for(var p=0;p<i.length;p++){var v=i[p],m=v.start_date,g=v.end_date
;if(m&&g)for(var f=e.date.date_part(new Date(m)),b=e.date.add(f,1,"day");f<g;){var h=e._lame_copy({},v);delete h.start_date,delete h.end_date,h.days=f.valueOf();var y=m>f?e._get_zone_minutes(m):l,x=g>b||g.getDate()!=f.getDate()?s:e._get_zone_minutes(g);h.zones=[y,x],a.push(h),f=b,b=e.date.add(b,1,"day")}else v.days instanceof Date&&(v.days=e.date.date_part(v.days).valueOf()),v.zones=t.zones.slice(),a.push(v)}return a},e._get_dates_by_index=function(t,a,i){var n=[]
;a=e.date.date_part(new Date(a||e._min_date)),i=new Date(i||e._max_date);for(var r=a.getDay(),o=t-r>=0?t-r:7-a.getDay()+t,d=e.date.add(a,o,"day");d<i;d=e.date.add(d,1,"week"))n.push(d);return n},e._get_css_classes_by_config=function(e){var t=[];return e.type==i&&(t.push(i),e.css&&t.push(i+"_reset")),t.push("dhx_marked_timespan",e.css),t.join(" ")},e._get_block_by_config=function(e){var t=document.createElement("div")
;return e.html&&("string"==typeof e.html?t.innerHTML=e.html:t.appendChild(e.html)),t},e._render_marked_timespan=function(t,a,i){var n=[],r=e.config,o=this._min_date,d=this._max_date,l=!1;if(!r.display_marked_timespans)return n;if(!i&&0!==i){if(t.days<7)i=t.days;else{var s=new Date(t.days);if(l=+s,!(+d>+s&&+o<=+s))return n;i=s.getDay()}var _=o.getDay();_>i?i=7-(_-i):i-=_}var c=t.zones,u=e._get_css_classes_by_config(t);if(e._table_view&&"month"==e._mode){var h=[],p=[];if(a)h.push(a),
p.push(i);else{p=l?[l]:e._get_dates_by_index(i);for(var v=0;v<p.length;v++)h.push(this._scales[p[v]])}for(var v=0;v<h.length;v++){a=h[v],i=p[v];var m=Math.floor((this._correct_shift(i,1)-o.valueOf())/(864e5*this._cols.length)),g=this.locate_holder_day(i,!1)%this._cols.length;if(!this._ignores[g]){var f=e._get_block_by_config(t),b=Math.max(a.offsetHeight-1,0),y=Math.max(a.offsetWidth-1,0),x=this._colsS[g],k=this._colsS.heights[m]+(this._colsS.height?this.xy.month_scale_height+2:2)-1
;f.className=u,f.style.top=k+"px",f.style.lineHeight=f.style.height=b+"px";for(var w=0;w<c.length;w+=2){var D=c[v],E=c[v+1];if(E<=D)return[];var S=f.cloneNode(!0);S.style.left=x+Math.round(D/1440*y)+"px",S.style.width=Math.round((E-D)/1440*y)+"px",a.appendChild(S),n.push(S)}}}}else{var N=i;if(this._ignores[this.locate_holder_day(i,!1)])return n;if(this._props&&this._props[this._mode]&&t.sections&&t.sections[this._mode]){var M=this._props[this._mode];N=M.order[t.sections[this._mode]]
;var A=M.order[t.sections[this._mode]];if(M.days>1){N=N*(M.size||M.options.length)+A}else N=A,M.size&&N>M.position+M.size&&(N=0)}a=a||e.locate_holder(N);for(var v=0;v<c.length;v+=2){var D=Math.max(c[v],60*r.first_hour),E=Math.min(c[v+1],60*r.last_hour);if(E<=D){if(v+2<c.length)continue;return[]}var S=e._get_block_by_config(t);S.className=u;var O=24*this.config.hour_size_px+1,T=36e5;S.style.top=Math.round((60*D*1e3-this.config.first_hour*T)*this.config.hour_size_px/T)%O+"px",
S.style.lineHeight=S.style.height=Math.max(Math.round(60*(E-D)*1e3*this.config.hour_size_px/T)%O,1)+"px",a.appendChild(S),n.push(S)}}return n},e._mark_timespans=function(){var t=this._els.dhx_cal_data[0],a=[];if(e._table_view&&"month"==e._mode)for(var i in this._scales){var n=new Date(+i);a.push.apply(a,e._on_scale_add_marker(this._scales[i],n))}else for(var n=new Date(e._min_date),r=0,o=t.childNodes.length;r<o;r++){var d=t.childNodes[r]
;d.firstChild&&e._getClassName(d.firstChild).indexOf("dhx_scale_hour")>-1||(a.push.apply(a,e._on_scale_add_marker(d,n)),n=e.date.add(n,1,"day"))}return a},e.markTimespan=function(t){var a=!1;this._els.dhx_cal_data||(e.get_elements(),a=!0);var i=e._marked_timespans_ids,n=e._marked_timespans_types,r=e._marked_timespans;e.deleteMarkedTimespan(),e.addMarkedTimespan(t);var o=e._mark_timespans();return a&&(e._els=[]),e._marked_timespans_ids=i,e._marked_timespans_types=n,e._marked_timespans=r,o},
e.unmarkTimespan=function(e){if(e)for(var t=0;t<e.length;t++){var a=e[t];a.parentNode&&a.parentNode.removeChild(a)}},e._addMarkerTimespanConfig=function(t){var a="global",i=e._marked_timespans,n=t.id,r=e._marked_timespans_ids;r[n]||(r[n]=[]);var o=t.days,d=t.sections,l=t.type;if(t.id=n,d){for(var s in d)if(d.hasOwnProperty(s)){i[s]||(i[s]={});var _=d[s],c=i[s];c[_]||(c[_]={}),c[_][o]||(c[_][o]={}),c[_][o][l]||(c[_][o][l]=[],e._marked_timespans_types||(e._marked_timespans_types={}),
e._marked_timespans_types[l]||(e._marked_timespans_types[l]=!0));var u=c[_][o][l];t._array=u,u.push(t),r[n].push(t)}}else{i[a][o]||(i[a][o]={}),i[a][o][l]||(i[a][o][l]=[]),e._marked_timespans_types||(e._marked_timespans_types={}),e._marked_timespans_types[l]||(e._marked_timespans_types[l]=!0);var u=i[a][o][l];t._array=u,u.push(t),r[n].push(t)}},e._marked_timespans_ids={},e.addMarkedTimespan=function(t){var a=e._prepare_timespan_options(t);if(a.length){
for(var i=a[0].id,n=0;n<a.length;n++)e._addMarkerTimespanConfig(a[n]);return i}},e._add_timespan_zones=function(e,t){var a=e.slice();if(t=t.slice(),!a.length)return t;for(var i=0;i<a.length;i+=2)for(var n=a[i],r=a[i+1],o=i+2==a.length,d=0;d<t.length;d+=2){var l=t[d],s=t[d+1];if(s>r&&l<=r||l<n&&s>=n)a[i]=Math.min(n,l),a[i+1]=Math.max(r,s),i-=2;else{if(!o)continue;var _=n>l?0:2;a.splice(i+_,0,l,s)}t.splice(d--,2);break}return a},e._subtract_timespan_zones=function(e,t){
for(var a=e.slice(),i=0;i<a.length;i+=2)for(var n=a[i],r=a[i+1],o=0;o<t.length;o+=2){var d=t[o],l=t[o+1];if(l>n&&d<r){var s=!1;n>=d&&r<=l&&a.splice(i,2),n<d&&(a.splice(i,2,n,d),s=!0),r>l&&a.splice(s?i+2:i,s?0:2,l,r),i-=2;break}}return a},e.invertZones=function(t){return e._subtract_timespan_zones([0,1440],t.slice())},e._delete_marked_timespan_by_id=function(t){var a=e._marked_timespans_ids[t];if(a)for(var i=0;i<a.length;i++)for(var n=a[i],r=n._array,o=0;o<r.length;o++)if(r[o]==n){r.splice(o,1)
;break}},e._delete_marked_timespan_by_config=function(t){var a,i=e._marked_timespans,r=t.sections,o=t.days,d=t.type||n;if(r){for(var l in r)if(r.hasOwnProperty(l)&&i[l]){var s=r[l];i[l][s]&&(a=i[l][s])}}else a=i.global;if(a)if(void 0!==o)a[o]&&a[o][d]&&(e._addMarkerTimespanConfig(t),e._delete_marked_timespans_list(a[o][d],t));else for(var _ in a)if(a[_][d]){var c=e._lame_clone(t);t.days=_,e._addMarkerTimespanConfig(c),e._delete_marked_timespans_list(a[_][d],t)}},
e._delete_marked_timespans_list=function(t,a){for(var i=0;i<t.length;i++){var n=t[i],r=e._subtract_timespan_zones(n.zones,a.zones);if(r.length)n.zones=r;else{t.splice(i,1),i--;for(var o=e._marked_timespans_ids[n.id],d=0;d<o.length;d++)if(o[d]==n){o.splice(d,1);break}}}},e.deleteMarkedTimespan=function(t){if(arguments.length||(e._marked_timespans={global:{}},e._marked_timespans_ids={},e._marked_timespans_types={}),"object"!=typeof t)e._delete_marked_timespan_by_id(t);else{
t.start_date&&t.end_date||(void 0!==t.days||t.type||(t.days="fullweek"),t.zones||(t.zones="fullday"));var a=[];if(t.type)a.push(t.type);else for(var i in e._marked_timespans_types)a.push(i);for(var n=e._prepare_timespan_options(t),r=0;r<n.length;r++)for(var o=n[r],d=0;d<a.length;d++){var l=e._lame_clone(o);l.type=a[d],e._delete_marked_timespan_by_config(l)}}},e._get_types_to_render=function(t,a){var i=t?e._lame_copy({},t):{};for(var n in a||{})a.hasOwnProperty(n)&&(i[n]=a[n]);return i},
e._get_configs_to_render=function(e){var t=[];for(var a in e)e.hasOwnProperty(a)&&t.push.apply(t,e[a]);return t},e._on_scale_add_marker=function(t,a){if(!e._table_view||"month"==e._mode){var i=a.getDay(),n=a.valueOf(),r=this._mode,o=e._marked_timespans,d=[],l=[];if(this._props&&this._props[r]){var s=this._props[r],_=s.options,c=e._get_unit_index(s,a),u=_[c];if(s.days>1){var h=864e5,p=Math.round((a-e._min_date)/h),v=s.size||_.length;a=e.date.add(e._min_date,Math.floor(p/v),"day"),
a=e.date.date_part(a)}else a=e.date.date_part(new Date(this._date));if(i=a.getDay(),n=a.valueOf(),o[r]&&o[r][u.key]){var m=o[r][u.key],g=e._get_types_to_render(m[i],m[n]);d.push.apply(d,e._get_configs_to_render(g))}}var f=o.global,b=f[n]||f[i];d.push.apply(d,e._get_configs_to_render(b));for(var y=0;y<d.length;y++)l.push.apply(l,e._render_marked_timespan(d[y],t,a));return l}},e.attachEvent("onScaleAdd",function(){e._on_scale_add_marker.apply(e,arguments)}),
e.dblclick_dhx_marked_timespan=function(t,a){e.callEvent("onScaleDblClick",[e.getActionData(t).date,a,t]),e.config.dblclick_create&&e.addEventNow(e.getActionData(t).date,null,t)}},e._temp_limit_scope()});
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_limit.js.map