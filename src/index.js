const app = require('./server');

// app.get('/', (req, res) => {
//     console.log("hey?")
//     res.json({
//         title: 'Accediendo a postman',
//         method: 'get'
//     });
// })

// app.post('/about/:id', (req, res) => {
//     console.log(req.body);
//     console.log(req.params);
//     res.send('POST REQUEST RECEIVED !!');
// })

// app.delete('/user/:userId', (req, res) => {
//     console.log(`User ${req.params.userId} has been deleted`);
//     console.log(req.params);
//     res.send('DELETE REQUEST RECEIVED 0!!');
// })

// app.use( async (err, req, res, next) => {
//     res.json({
//         message: 'Errrroooor'
//     })
//     // console.log('OJOOOOO')
// })

app.listen(app.get('port'), () => {
    
    console.log('Server on port: ', app.get('port'));
});
