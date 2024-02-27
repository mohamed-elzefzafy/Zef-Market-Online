import React from 'react'
import ProductCarouselComponent from '../../components/ProductCarouselComponent'
import { Container, Row } from 'react-bootstrap'
import CategoryCardComponent from '../../components/CategoryCardComponent'
import { useSelector } from 'react-redux'
import MetaComponent from '../../components/MetaComponent'

const HomePageComponent = ({categories}) => {
  const {bestSellerProducts} = useSelector(state => state.products)
  return (
    <>
    <MetaComponent/>
    <ProductCarouselComponent bestSellerProducts={bestSellerProducts}/>
    <Container>

  
    <Row xs={1} md={2} className="g-4 mt-5">



    {categories?.map((category , index) => 
      <CategoryCardComponent  category={category} index={index} key={index}/>
    )}
    </Row>
    </Container>
    </>
  )
}

export default HomePageComponent