import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val.trim());
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setEmailError('Inserisci un indirizzo email valido');
      return;
    }

    setEmailError('');
    setIsLoading(true);

    // Simulated network verification before presenting password screen
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 900);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      setPasswordError('La password deve contenere almeno 6 caratteri');
      return;
    }

    setPasswordError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert('Autenticazione completata.');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Centered Login Card */}
      <div className="relative w-full max-w-[340px] sm:max-w-[360px] bg-white rounded-[26px] border border-gray-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.08)] px-7 py-8">
        {/* Loading Modal / Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-[1px] rounded-[26px] z-20 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#0066cc] animate-spin mb-2" />
            <p className="text-xs font-medium text-gray-600">Verifica in corso...</p>
          </div>
        )}

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="text-[26px] font-bold tracking-tight text-[#004f9e] uppercase">
              ACCESSO
            </span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#78be20] mb-0.5" />
          </div>
          <p className="text-[15px] font-medium text-[#0066cc]">Accedi</p>
        </div>

        {step === 1 ? (
          /* STEP 1: Email Form */
          <form
            method="POST"
            action=""
            onSubmit={handleEmailSubmit}
            noValidate
            className="flex flex-col"
          >
            <div className="mb-4">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                placeholder="Inserisci la tua email"
                autoComplete="email"
                required
                className={`w-full h-[46px] px-3 text-[14px] text-gray-800 placeholder:text-gray-500 bg-white border ${
                  emailError ? 'border-red-500' : 'border-gray-400 focus:border-[#0066cc]'
                } rounded-[5px] outline-none transition-colors`}
              />
              {emailError && (
                <p className="text-[11px] text-red-600 mt-1 pl-1">{emailError}</p>
              )}
            </div>

            {/* Avanti Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[44px] bg-[#0066cc] hover:bg-[#005bb8] active:bg-[#004c99] text-white font-semibold text-[15px] rounded-full transition-colors cursor-pointer disabled:opacity-60"
            >
              Avanti
            </button>

            {/* Options */}
            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-gray-700">
                <input
                  type="checkbox"
                  name="remember_me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-400 text-[#0066cc] focus:ring-0 cursor-pointer"
                />
                <span>Rimani collegato</span>
              </label>

              <a
                href="#help"
                onClick={(e) => e.preventDefault()}
                className="text-[13px] text-[#0066cc] hover:underline"
              >
                Serve aiuto?
              </a>
            </div>

            {/* Registration footer */}
            <div className="mt-8 text-center text-[13px] text-gray-700">
              <span>Non hai un account? </span>
              <a
                href="#registrati"
                onClick={(e) => e.preventDefault()}
                className="text-[#0066cc] hover:underline font-medium"
              >
                Registrati ora
              </a>
            </div>
          </form>
        ) : (
          /* STEP 2: Password Verification Screen (Replaces Step 1 in place) */
          <form
            method="POST"
            action=""
            onSubmit={handlePasswordSubmit}
            noValidate
            className="flex flex-col"
          >
            {/* Verified email identifier */}
            <div className="mb-4 bg-gray-50 border border-gray-200 rounded-[5px] px-3 py-2 flex items-center justify-between text-[13px]">
              <span className="font-medium text-gray-800 truncate mr-2">{email}</span>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setPasswordError('');
                }}
                className="text-[#0066cc] hover:underline shrink-0 font-medium cursor-pointer"
              >
                Modifica
              </button>
            </div>

            {/* Hidden field to pass email state */}
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="remember_me" value={rememberMe ? '1' : '0'} />

            {/* Password input */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  placeholder="Inserisci la password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  className={`w-full h-[46px] pl-3 pr-10 text-[14px] text-gray-800 placeholder:text-gray-500 bg-white border ${
                    passwordError ? 'border-red-500' : 'border-gray-400 focus:border-[#0066cc]'
                  } rounded-[5px] outline-none transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
                  aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-[11px] text-red-600 mt-1 pl-1">{passwordError}</p>
              )}
            </div>

            {/* Accedi Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[44px] bg-[#0066cc] hover:bg-[#005bb8] active:bg-[#004c99] text-white font-semibold text-[15px] rounded-full transition-colors cursor-pointer disabled:opacity-60"
            >
              Accedi
            </button>

            {/* Return & Recovery options */}
            <div className="flex items-center justify-between mt-4">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setPasswordError('');
                }}
                className="text-[13px] text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                ← Indietro
              </button>

              <a
                href="#forgot"
                onClick={(e) => e.preventDefault()}
                className="text-[13px] text-[#0066cc] hover:underline"
              >
                Password dimenticata?
              </a>
            </div>

            {/* Registration footer */}
            <div className="mt-8 text-center text-[13px] text-gray-700">
              <span>Non hai un account? </span>
              <a
                href="#registrati"
                onClick={(e) => e.preventDefault()}
                className="text-[#0066cc] hover:underline font-medium"
              >
                Registrati ora
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
