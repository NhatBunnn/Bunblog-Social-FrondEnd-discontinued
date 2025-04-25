const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

// Middleware: HTTP Logger
app.use(morgan('combined'));

// Cấu hình Template Engine (Handlebars)
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: [
        path.join(__dirname, 'views', 'partials'), 
        path.join(__dirname, 'views', 'pages', 'sub-pages') 
    ]
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); 

// Cấu hình thư mục chứa file tĩnh (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/src', express.static(path.join(__dirname, 'src'))); // Chứa file JS logic


// Routes setting 
app.get("/setting/account", (req, res) => res.render("pages/sub-settingPages/account-setting", { layout: "setting" }));
app.get("/setting/personal-page", (req, res) => res.render("pages/sub-settingPages/personal-page-setting", { layout: "setting" }));


// Routes Login & Register (Dùng layout riêng)
app.get("/login", (req, res) => res.render("pages/login", { layout: "auth" }));
app.get("/register", (req, res) => res.render("pages/register", { layout: "auth" }));

// Kiểm tra file logic JS trong src có hoạt động không
app.get('/test-js', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'controller', 'authController.js'));
});

// Routes chính
app.get("/", (req, res) => res.render("pages/home"));
app.get("/chat", (req, res) => res.render("pages/chat"));
app.get('/:name', (req, res) => {
    const username = req.params.name;
    res.render('pages/userPage', { username });
});

// Khởi động server
app.listen(port, (error) => {
    if (error) console.log("Something went wrong");
    console.log(`Server is running on port: ${port}`);
});
