const pad = n => String(n).padStart(2, '0')
function dateKey(d) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}` }
function parseDate(s) { const [y,m,d] = s.split('-').map(Number); return new Date(y,m-1,d,0,0,0,0) }
function summarize(course, now = new Date()) {
  const start = parseDate(course.startDate)
  start.setDate(start.getDate() + (Number(course.weekday)-start.getDay()+7)%7)
  const [h,m] = course.endTime.split(':').map(Number)
  let completed = Number(course.initialUsed), next = null
  const records = []
  // Iterate calendar dates, not 24-hour milliseconds, to avoid daylight-saving drift.
  for (let i=0; i<10400 && completed<course.total; i++) {
    const day = new Date(start); day.setDate(day.getDate()+i*7)
    const key = dateKey(day), skipped = !!(course.skips || {})[key]
    const end = new Date(day); end.setHours(h,m,0,0)
    if (end > now) { next = {date:key, skipped}; break }
    if (!skipped) completed++
    records.push({date:key, skipped})
  }
  return {...course, completed, remaining:Math.max(0,course.total-completed), percent:Math.round(completed/course.total*100), next, records:records.reverse(), weekdayLabel:['日','一','二','三','四','五','六'][course.weekday]}
}


