import React from 'react';
import styled from 'styled-components';

import searchIcon from '../assets/search-icon.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputWrapper } from '../components/Input';

const StyledHero = styled.div`
  width: 100%;
  @media screen and (min-width: 767px) {
    max-width: 600px;
  }
  p {
    color: var(--grey300);
  }
`;

type SearchInput = {
  searchTerm: string;
};

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SearchInput>();
  const onSubmit: SubmitHandler<SearchInput> = (data) => console.log(data);

  return (
    <StyledHero>
      <h1>MoviePal</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptatum assumenda repellendus est sunt delectus architecto voluptate fugit quae molestias.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper error={errors.searchTerm} label="Search Movies or TV Shows" iconPosition="left" icon={<img src={searchIcon} alt="" aria-hidden />}>
          <input placeholder=" " {...register('searchTerm', { required: 'Please enter movie or TV name' })} />
          <label htmlFor="searchTerm">Search Movies or TV Shows</label>
        </InputWrapper>
      </form>
    </StyledHero>
  );
};

export default Home;
