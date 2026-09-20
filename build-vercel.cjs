const fs=require('fs')
fs.rmSync('vercel-dist',{recursive:true,force:true})
fs.cpSync('public','vercel-dist',{recursive:true})
