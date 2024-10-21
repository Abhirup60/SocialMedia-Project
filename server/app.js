const express = require("express");
const cookieParser = require("cookie-parser");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

const Users = require("./models/userSchema");
const Post = require("./models/postSchema");

require("./db/connection");

// import middlewares
const authenticate = require('./middleware/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(
  {
    origin: ["https://social-media-project-frontend.vercel.app"],
    methods: ["POST","GET"],
    credentials: true
  }
));

const port = process.env.PORT || 8000;

// app.get("/", (req, res) => {
//   res.send("hello!!");
// });

app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate request body
    if (!username || !email || !password) {
      return res.status(400).send('Cannot be empty');  // Add return here
    }

    // Check if user exists
    const isExist = await Users.findOne({ email });
    if (isExist) {
      return res.status(400).json("User already exists");  // Add return here
    }

    // Hash the password and save user
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new Users({ username, email, password: hashedPassword });
    await user.save();

    return res.status(200).send("Successfully registered");  // Add return here

  } catch (error) {
    res.status(500).send('Server error');
    console.log(error, "error");
  }
});


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(403).send("User or password is invalid");  // Add return here
    }

    // Compare provided password with the stored hashed password
    const validate = await bcryptjs.compare(password, user.password);
    if (!validate) {
      return res.status(403).send("User or password is invalid");  // Add return here
    }

    const payload = {
      id: user._id,
      username: user.username
    };

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_THE_SECRET_KEY_OF_JWT';
    const token = jwt.sign(
      payload,
      JWT_SECRET_KEY,
      { expiresIn: '1d' }  // Token expires in 1 day
    );

    return res.status(200).json({ user, token });  // Ensure return here as well

  } catch (error) {
    res.status(500).send('Server error');
    console.log(error, "error");
  }
});

app.post('/api/new-post',authenticate, async (req, res) => {
  try {
    console.log(req.body, 'body');

    const { caption, desc, image } = req.body;
    const {user} = req;
    // Validate request body
    if (!caption || !desc || !image) {
      return res.status(400).json({ error: "Please fill the body" });
    }

    // Create new post
    const createPost = new Post({
      caption,
      description: desc,
      image: image,  // Use the 'image' from req.body
      user: user
    });

    await createPost.save();
    return res.status(200).json({ message: "Post created successfully" });

  } catch (error) {
    return res.status(500).json({ error: "Server error: " + error });
  }
});

app.get('/api/profile', authenticate, async(req,res)=>{
  try {
    const {user} = req;
    const posts = await Post.find({user: user._id})
    // console.log(posts);
    res.status(200).json({posts})
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get('/api/posts', authenticate, async(req,res)=>{
  try {
    const {user} = req;
    const posts = await Post.find()
    // console.log(posts);
    res.status(200).json({posts, user})
  } catch (error) {
    res.status(500).send(error)
  }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
