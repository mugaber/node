const fs = require('fs')

fs.readFile('fighters.csv', (err, buf) => {
  if (err) return console.log(err)

  csvData = buf.toString()

  const lines = csvData.split('\n')

  const keyArray = [
    'url',
    'height',
    'weight',
    'reach',
    'stance',
    'dob',
    'SLpM',
    'Str. Acc',
    'SAmP',
    'Str. Def.',
    'TD Avg.',
    'TD Acc.',
    'TD Def.',
    'Sub. Avg.',
    'Record',
    'nick_name',
    'full_name',
    'last_date',
    'id',
  ]

  const newDataArr = lines.map((line, idx) => {
    const lineData = line.split(',').map(item => item.trim().replace(/"/g, ''))

    const dob = lineData.splice(5, 2).join()
    lineData.splice(5, 0, dob)

    lineData[14] && (lineData[14] = lineData[14].split(': ')[1])

    const newLineObj = {}
    keyArray.forEach((key, i) => (newLineObj[key] = lineData[i]))
    return newLineObj
  })

  let lastName = ''
  const filteredDataArr = newDataArr.filter(el => {
    if (lastName === el['full_name']) return false
    lastName = el['name']
    return true
  })

  const newDataObj = { ...filteredDataArr }

  const newDataJSON = JSON.stringify(newDataObj, null, 2)

  try {
    fs.writeFileSync('fighters_data.js', newDataJSON, 'utf-8')
  } catch (err) {
    console.log(err)
  }

  console.log('fighters.js written successfully')
})
