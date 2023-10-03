import Link from 'next/link';
import React from 'react'

function About() {
  const stacks = [
    {
      name: 'Next js',
      href: 'https://nextjs.com',
    },
    {
      name: 'Vercel',
      href: 'https://vercel.com',
    },
    {
      name: 'Shadcn UI',
      href: 'https://ui.shadcn.com',
    },
  ]
  return (
    <main className='space-y-20'>
      <div className='max-w-5xl mx-auto w-[90vw] flex flex-col gap-y-4'>
        <div className="text-left">
          <h1 className='text-2xl font-semibold mb-4'>
            About Us
          </h1>
          <p className='lg:text-base text-sm font-normal'>
           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia rerum debitis quia, assumenda nam dicta. Numquam hic maxime ipsam reiciendis dolor iste temporibus corporis ut, commodi blanditiis adipisci rerum facilis a eaque asperiores cupiditate. Atque, quam magnam. Aperiam similique cum, excepturi, sint magni aspernatur assumenda aliquam nostrum tempora praesentium laudantium repellat tempore aut earum molestiae? Necessitatibus quam et, perspiciatis, praesentium illo modi veritatis numquam, deleniti accusamus aperiam consequuntur quidem odit voluptas tempore corrupti quis. Necessitatibus quidem hic voluptates nobis temporibus magni eum doloribus. Et, vitae. Ratione velit cupiditate nemo perferendis, sequi veritatis necessitatibus. Vel impedit optio quasi modi officia aut ex blanditiis molestias ipsam quisquam error sit voluptates odio rerum illo autem velit quam cum, atque veritatis sapiente. Magnam obcaecati ullam quasi? Sit labore voluptates ipsa quibusdam modi officiis voluptate aperiam eligendi quia corrupti rem porro illum vero maxime consectetur corporis cum, fugiat minima. Ducimus ut aperiam expedita eaque esse voluptatem consectetur fugiat. Quisquam eligendi illo totam doloremque laboriosam asperiores alias delectus mollitia perferendis consequuntur tenetur ipsam accusamus cupiditate aliquid ea blanditiis laborum veritatis a, expedita voluptate unde quos. Perferendis quae necessitatibus est non modi fuga blanditiis debitis maxime quibusdam omnis possimus tempore maiores ea doloribus suscipit ipsa, minima quisquam sequi voluptas rem nam obcaecati architecto? Officia perspiciatis, earum quo eum nisi totam, dolor quasi odit mollitia nobis, beatae culpa reprehenderit! Hic distinctio, consequatur nemo amet modi iusto voluptas dolores maxime alias fugiat eum voluptate nesciunt sunt consequuntur repudiandae doloremque facere id corporis quidem quia eveniet nobis? Culpa quibusdam illum obcaecati ab cupiditate ut dolorum consequuntur molestias recusandae blanditiis. Quis repellat nemo deleniti quos exercitationem error enim, aut vero dolore ratione aperiam facere eaque similique culpa provident architecto quisquam assumenda. Ipsam mollitia, corrupti, ducimus quod saepe vitae molestias accusantium inventore at reiciendis odit consequatur ad perferendis odio nihil id fugit!
          </p>
        </div>
        <div className="text-left">
          <h1 className='text-2xl font-semibold mb-4'>
            Our Stack{' '}
          </h1>
          <p className='lg:text-base text-sm font-normal'>
            Stack: {' '}
            {stacks.map((stack, index) => (
              <Link
                key={index}
                href={stack.href}
                target='_blank'
                className='text-purple-600'
              >
                {stack.name + ', '}
              </Link>
            ))}
            
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;