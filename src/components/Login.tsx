import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { ChefHat, ArrowLeft, CheckCircle2 } from "lucide-react@0.487.0";
import { toast } from "sonner@2.0.3";

interface LoginProps {
  onLoginSuccess: (phoneNumber: string) => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate Indian phone number (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
      setTimeout(() => onLoginSuccess(phoneNumber), 1500);
    }, 1000);
  };

  const handleOtpSubmit = () => {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification (accept any 6-digit OTP for demo)
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
      
      // Wait a moment to show success state, then complete login
      setTimeout(() => {
        
      }, 1500);
    }, 1000);
  };

  const handleResendOtp = () => {
    setOtp("");
    toast.success("OTP resent successfully!");
  };

  const handleBack = () => {
    setOtp("");
    setStep("phone");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500 text-white mb-4">
            <ChefHat size={32} />
          </div>
          <h1 className="text-orange-600 dark:text-orange-500 mb-2">ChefHub</h1>
          <p className="text-muted-foreground">
            🎉 Book Professional Chefs for Your Events, Home Parties & Gatherings! 🍽️
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              {step === "otp" && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="mr-2"
                >
                  <ArrowLeft size={20} />
                </Button>
              )}
              <div>
                <CardTitle>
                  {step === "phone" && "Login"}
                  {step === "otp" && "Verify OTP"}
                  {step === "success" && "Success!"}
                </CardTitle>
                <CardDescription>
                  {step === "phone" && "Enter your mobile number to continue"}
                  {step === "otp" && `Enter the 6-digit code sent to +91 ${phoneNumber}`}
                  {step === "success" && "You're all set!"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {step === "phone" && (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 border rounded-md bg-muted">
                      <span className="text-muted-foreground">+91</span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      maxLength={10}
                      className="flex-1"
                      autoComplete="tel"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We'll send you a one-time password
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={isLoading || phoneNumber.length !== 10}
                >
                  {isLoading ? "Signing In..." : "Find My Chef"}
                </Button>
              </form>
            )}

            {step === "otp" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="otp" className="text-center block">
                    Enter OTP
                  </Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                      onComplete={handleOtpSubmit}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    For demo: Enter any 6-digit code
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleOtpSubmit}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={handleResendOtp}
                    className="w-full"
                    type="button"
                  >
                    Resend OTP
                  </Button>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="text-center py-8 space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3">
                    <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-500" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2">Login Successful!</h3>
                  <p className="text-muted-foreground">
                    Meet our Chefs now...
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to ChefHub's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
