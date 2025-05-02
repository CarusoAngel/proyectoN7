import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <h1 className="text-5xl font-bold text-white mb-8">
        Stellare Industries 🚀
      </h1>
      
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}

export default App;
