import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import User from './User';
import '@testing-library/jest-dom';


vi.mock('axios');

const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

describe('User component', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading message', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue({ data: {} })
    render(<User/>)
    const loading = screen.getByText(/loading/i)

    expect(loading).toBeInTheDocument();
  })

  it('should fetch and display user data', async () => {

    mockedAxios.get = vi.fn().mockResolvedValue({
      data: {
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        username: 'Bret',
        website: 'hildegard.org'
      }
    });

    render(<User />);

    

    const name = await screen.findByText('Leanne Graham');
    const email = await screen.findByText('Sincere@april.biz')
    const phone = await screen.findByText('1-770-736-8031 x56442')
    const username = await screen.findByText('Bret')
    const website = await screen.findByText('hildegard.org')

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(username).toBeInTheDocument(); 
    expect(website).toBeInTheDocument();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users/1'
    );
  });

  it('should show error message', async () => {

    mockedAxios.get = vi.fn().mockRejectedValue(new Error('Fail'));

    render(<User />);

    const error = await screen.findByText(/error loading user/i);

    expect(error).toBeInTheDocument();
  });

});

  
