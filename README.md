<h1>🤖 Django AI Chatbot (Local LLM – Ollama Phi-3 Mini)</h1>

<p>
This project is a <b>Django-based AI chatbot</b> that integrates a <b>locally running Large Language Model (LLM)</b>
using <b>Ollama’s Phi-3 Mini</b>.  
The chatbot runs <b>entirely on local infrastructure</b> without relying on any paid or external AI APIs.
</p>

<hr/>

<h2>🧠 Project Overview</h2>
<p>
The application demonstrates how modern AI models can be integrated with traditional
web frameworks like Django to build secure, scalable, and production-style applications.
Each user has an isolated chat experience with persistent conversation history stored in a relational database.
</p>

<hr/>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li>Django</li>
  <li>Python</li>
  <li>Ollama (Phi-3 Mini model)</li>
  <li>HTML, CSS, JavaScript</li>
  <li>Relational Database (SQLite)</li>
</ul>

<hr/>

<h2>✨ Key Features</h2>
<ul>
  <li>AI chatbot powered by <b>local LLM (Phi-3 Mini)</b></li>
  <li>No paid APIs or cloud-based AI services</li>
  <li>User authentication (Signup & Login)</li>
  <li>User-wise chat history storage</li>
  <li>Persistent conversations using database models</li>
  <li>Secure backend architecture for AI requests</li>
  <li>Interactive frontend with real-time responses</li>
</ul>

<hr/>

<h2>🔐 Authentication & Data Handling</h2>
<ul>
  <li>Users must register and log in to access the chatbot</li>
  <li>Each user has isolated chat sessions</li>
  <li>Chat messages are stored securely in the database</li>
  <li>No sensitive keys or credentials are exposed</li>
</ul>

<hr/>

<h2>⚙️ System Architecture</h2>
<ul>
  <li>Django handles authentication, routing, and business logic</li>
  <li>Ollama runs the Phi-3 Mini model locally</li>
  <li>Django views communicate with the local LLM process</li>
  <li>Chat requests and responses are persisted in the database</li>
  <li>Frontend communicates with Django views using AJAX </li>
</ul>

<hr/>

<h2>🖥️ Frontend</h2>
<ul>
  <li>Built using HTML, CSS, and JavaScript</li>
  <li>Interactive chat UI</li>
  <li>Asynchronous requests for near real-time AI responses</li>
  <li>User-friendly conversation interface</li>
</ul>

<hr/>

<h2>🚀 Setup Instructions</h2>
<ol>
  <li>Clone the repository</li>
  <pre><code>git clone https://github.com/your-username/your-repo-name.git</code></pre>

  <li>Create and activate virtual environment</li>
  <pre><code>python -m venv venv
venv\Scripts\activate</code></pre>

  <li>Install dependencies</li>
  <pre><code>pip install django</code></pre>

  <li>Install and run Ollama with Phi-3 Mini</li>
  <pre><code>ollama pull phi3
ollama run phi3</code></pre>

  <li>Run migrations</li>
  <pre><code>python manage.py migrate</code></pre>

  <li>Start the Django server</li>
  <pre><code>python manage.py runserver</code></pre>
</ol>

<hr/>

<h2>📚 Learning Outcomes</h2>
<ul>
  <li>Practical integration of local LLMs with Django</li>
  <li>Designing AI-powered web applications without paid APIs</li>
  <li>Handling persistent AI conversations</li>
  <li>Building scalable and secure backend systems</li>
  <li>Full-stack development with AI workflows</li>
</ul>

<hr/>

<h2>🎯 Use Case</h2>
<p>
This project serves as a real-world example of how AI chatbots can be deployed locally
for privacy-focused, cost-effective, and customizable applications.
</p>

<hr/>

<h2>🙌 Author</h2>
<p>
<b>Aminur Rahman</b><br/>
</p>
