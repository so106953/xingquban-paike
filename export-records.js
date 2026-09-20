function csvValue(value){
  const text=String(value??'')
  return /[",\n\r]/.test(text)?`"${text.replaceAll('"','""')}"`:text
}

function exportRecords(){
  const generatedAt=new Date()
  const rows=[['导出时间','课程名称','课程状态','总课时','统计开始日期','此前已上课时','每周上课日','上课时间','记录日期','记录类型','课时变化','说明']]
  courses.forEach(course=>{
    const summary=summarize(course,generatedAt)
    const base=[generatedAt.toLocaleString('zh-CN'),course.name,course.archived?'已收起':'进行中',course.total,course.startDate,course.initialUsed,`星期${summary.weekdayLabel}`,`${course.startTime}–${course.endTime}`]
    rows.push([...base,'','课程设置','',''])
    if(course.initialUsed>0)rows.push([...base,'开始日期前','历史已上',`-${course.initialUsed}`,'由“此前已上课时”填写'])
    summary.records.slice().reverse().forEach(record=>rows.push([...base,record.date,record.skipped?'请假':'已上',record.skipped?'0':'-1',record.skipped?'请假，不扣课':'课程结束后扣 1 节']))
  })
  const blob=new Blob(['\ufeff'+rows.map(row=>row.map(csvValue).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'})
  const href=URL.createObjectURL(blob),link=document.createElement('a')
  link.href=href;link.download=`兴趣课时记录_${dateKey(generatedAt)}.csv`;document.body.append(link);link.click();link.remove()
  setTimeout(()=>URL.revokeObjectURL(href),1000)
  notify('记录已导出，可用 Excel 打开')
}

const exportButton=document.createElement('button')
exportButton.type='button'
exportButton.className='export-records'
exportButton.textContent='导出记录'
exportButton.addEventListener('click',exportRecords)
document.querySelector('.course-toolbar>div').prepend(exportButton)
