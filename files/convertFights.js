const fs = require('fs')

fs.readFile('fights.csv', (err, buf) => {
    if (err) return console.log(err)

    csvData = buf.toString()

    const lines = csvData.split('\n')

    const keyArray = [
        'event_url',
        'name',
        'date',
        'location',
        'fight_url',
        'weight_class',
        'method',
        'round',
        'time',
        'belt'
    ]

    const newDataArr = lines.map(line => {
        const lineData = line.split(',').map(entry => entry.replace(/"/g, ''))

        const date = lineData.splice(2, 2).join()

        const checkStart = lineData.slice(4, 5)[0]

        let spliceNumber = 3

        checkStart && checkStart.includes('http') && (spliceNumber = 2)
        const location = lineData.splice(2, spliceNumber).join()

        lineData.splice(2, 0, date)
        lineData.splice(3, 0, location)

        const newLineObj = {}
        keyArray.forEach((key, i) => (newLineObj[key] = lineData[i]))
        return newLineObj
    })

    let lastName = ''

    const filteredDataArr = newDataArr.filter(el => {
        if (lastName === el['name']) return false
        lastName = el['name']
        return true
    })

    const newDataObj = { ...filteredDataArr }

    const newDataJSON = JSON.stringify(newDataObj, null, 2)

    try {
        fs.writeFileSync('filtered_fights.js', newDataJSON, 'utf-8')
    } catch (err) {
        console.log(err)
    }

    console.log('fights.js written successfully')
})
