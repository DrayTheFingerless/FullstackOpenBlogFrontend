import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
  let container
  const blog = {
    id: "testId",
    title: "test title",
    author: "test author",
    url: "test.url",
    likes: 3
  }

  const handleLike = vi.fn()
  const handleRemove = vi.fn()

  beforeEach(() => {
    container = render(
      <Blog handleLike={handleLike} 
      handleRemove={handleRemove} 
      key={blog.id} blog={blog} />
    ).container
  })

  test('renders its children', async () => {
     const div = container.querySelector('.blog')  
     expect(div).toHaveTextContent(    
        'test title'  
    )
  })
 
   test('after clicking the button, children are displayed', async () => {

        const div = container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')

        const user = userEvent.setup()
        const button = screen.getByText('show')
        await user.click(button)

        expect(div).not.toHaveStyle('display: none')
  })

  test('after clicking the like button, counter goes up twice', async () => {


    const user = userEvent.setup()  
    const button = screen.getByText('Like')  
    await user.click(button)

    expect(handleLike.mock.calls).toHaveLength(1)

    await user.click(button)

    expect(handleLike.mock.calls).toHaveLength(2)

  })
})