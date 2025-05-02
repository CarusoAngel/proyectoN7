import RegisterForm from '../components/RegisterForm';

export default function Registro() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Registro - Stellare Industries
      </h2>

      <div className="bg-gray-100 p-6 rounded-xl shadow-xl w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
