import React from 'react';
import { Card, Text } from '@nextui-org/react';
import './billing-styles.scss';
import { CreateCheckoutSession } from 'api';
import Package from './Package';

function Billing() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      priceId: 'price_1Lctr7E2i8pEhEDNqTwt0rfu',
      success_url: '',
      cancel_url: '',
    };

    CreateCheckoutSession(body).then((data) => {
      window.location.replace(data.sessionUrl);
    });
  };

  const packages = [
    {
      name: 'Pro Plan',
      monthly: '$99.99',
      yearly: '$800.00',
      features: {
        users: 1,
        accounts: 10,
      },
      description:
        'THIS NEEDS WORDING - $500 ad spend for social boosts Discover the best time to publish Access messages in one inbox Schedule in bulk Access to free integrations Live in-dash chat support',
    },
    {
      name: 'Team Plan',
      monthly: '$179.99',
      yearly: '$1,600.00',
      features: {
        users: 3,
        accounts: 20,
      },
      description:
        'THIS NEEDS WORDING - $2000 ad spend for social boosts Analytics & reports Access messages in one inbox Schedule in bulk Access to free integrations Live in-dash chat support',
    },
    {
      name: 'Enterprise Plan',
      monthly: '$299.99',
      yearly: '$2,400.00',
      features: {
        users: 5 + '+',
        accounts: 50,
      },
      description:
        'THIS NEEDS WORDING - Publishing approvals Employee advocacy Social advertising Social customer care App directory with 150+ tools Priority support and training',
    },
  ];

  return (
    <div className="view-container">
      <Card
        style={{ zIndex: 1 }}
        css={{
          background: '$myColor',
          width: '80%',
          margin: '3rem',
        }}
      >
        <div className="head">
          <Text
            h1
            size={50}
            weight="bold"
            css={{
              textGradient: '45deg, $blue600 -20%, $pink600 50%',
              height: 'fit-content',
            }}
          >
            OUR PACKAGES
          </Text>
          <Text h4>
            AntiSocialSuite does not save any credit card information. <br />
            We bill through Stripe.
          </Text>
        </div>
        <Card.Body
          css={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {packages.map((pkg, i) => (
            <Package key={i} {...pkg} handleSubmit={handleSubmit} />
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Billing;
