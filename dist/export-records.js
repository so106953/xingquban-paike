function cell(value){return String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')}
function leaveTime(course,date){const entry=course.skips?.[date];if(entry&&typeof entry==='object'&&entry.markedAt)return new Date(entry.markedAt).toLocaleString('zh-CN');return entry?'此前版本未记录':''}
function exportRecords(){
  const generatedAt=new Date(),rows=[]
  courses.forEach(course=>{
    const summary=summarize(course,generatedAt)
    summary.records.slice().reverse().forEach(record=>rows.push({name:course.name,status:course.archived?'已收起':'进行中',date:record.date,start:course.startTime,end:course.endTime,type:record.skipped?'请假':'已上',leave:record.skipped?leaveTime(course,record.date):'',change:record.skipped?'0':'-1',note:record.skipped?'请假，不扣课':'课程结束后扣 1 节'}))
    if(course.initialUsed>0)rows.push({name:course.name,status:course.archived?'已收起':'进行中',date:`${course.startDate} 前`,start:'',end:'',type:'历史已上',leave:'',change:`-${course.initialUsed}`,note:'由“此前已上课时”填写'})
  })
  const body=rows.map(row=>`<tr><td>${cell(row.name)}</td><td>${cell(row.status)}</td><td>${cell(row.date)}</td><td>${cell(row.start)}</td><td>${cell(row.end)}</td><td>${cell(row.type)}</td><td>${cell(row.leave)}</td><td>${cell(row.change)}</td><td>${cell(row.note)}</td></tr>`).join('')||'<tr><td colspan="9">暂无已结束的课程记录</td></tr>'
  const html=`<!doctype html><html><head><meta charset="utf-8"><style>table{border-collapse:collapse;font-family:Microsoft YaHei,Arial}th,td{border:1px solid #9fbad0;padding:8px;white-space:nowrap}th{background:#dff2ff;color:#16436b}</style></head><body><h2>兴趣课时记录</h2><p>导出时间：${cell(generatedAt.toLocaleString('zh-CN'))}</p><table><tr><th>课程名称</th><th>课程状态</th><th>上课日期</th><th>上课时间</th><th>下课时间</th><th>记录类型</th><th>请假登记时间</th><th>课时变化</th><th>说明</th></tr>${body}</table></body></html>`
  const blob=new Blob(['\ufeff'+html],{type:'application/vnd.ms-excel;charset=utf-8'})
  const href=URL.createObjectURL(blob),link=document.createElement('a')
  link.href=href;link.download=`兴趣课时记录_${dateKey(generatedAt)}.xls`;document.body.append(link);link.click();link.remove()
  setTimeout(()=>URL.revokeObjectURL(href),1000);notify('Excel 表格已导出')
}
const exportButton=document.createElement('button')
exportButton.type='button';exportButton.className='export-records';exportButton.textContent='导出 Excel'
exportButton.addEventListener('click',exportRecords)
document.querySelector('.course-toolbar>div').prepend(exportButton)
