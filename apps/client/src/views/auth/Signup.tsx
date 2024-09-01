import { Link, useNavigate } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import services from '@/services/auth.route';
import { RegisterUser } from '@e_commerce_package/models/types';
import { useToast } from '@/hooks/use-toast';

export const SignupForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [userData, setUserData] = useState<RegisterUser>({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });

  const { mutateAsync: signUpMutation } = useMutation({
    mutationFn: () => services.signUp(userData),
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['auth', 'status'] });
      setLoading(false);
      toast({
        title: 'Success',
        description: 'Account created successfully'
      });
      navigate('/sign-in');
    }
  });

  const handleFormChange = <T extends object>(
    e: ChangeEvent<HTMLInputElement>,
    callback: React.Dispatch<React.SetStateAction<T>>
  ) => {
    const { value, name } = e.target;
    callback((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    signUpMutation();
  };

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-xl'>Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className='grid gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='first-name'>First name</Label>
                <Input
                  id='first-name'
                  name='first_name'
                  value={userData.first_name}
                  onChange={(e) => handleFormChange(e, setUserData)}
                  placeholder='Max'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='last-name'>Last name</Label>
                <Input
                  id='last-name'
                  name='last_name'
                  value={userData.last_name}
                  onChange={(e) => handleFormChange(e, setUserData)}
                  placeholder='Robinson'
                  required
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                name='email'
                value={userData.email}
                onChange={(e) => handleFormChange(e, setUserData)}
                placeholder='m@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                value={userData.password}
                onChange={(e) => handleFormChange(e, setUserData)}
                type='password'
                placeholder='********'
              />
            </div>
            <Button type='submit' className='w-full' isLoading={loading}>
              Create an Account
            </Button>
          </form>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link to='/sign-in' className='underline'>
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
