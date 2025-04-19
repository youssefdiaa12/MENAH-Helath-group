import React from 'react';

const EBMHealthTipEnglish = () => {
  return (
    <div style={{ padding: '20px', lineHeight: '1.6' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '22px', textAlign: 'center' }}>
        Health Tips: Breastfeeding & Expression
      </h2>

      <h3 style={{ fontWeight: 'bold' }}>Why Breastmilk is Important</h3>
      <p>
        Breastmilk is species-specific and tailor-made for human babies. It contains water, fat, minerals, vitamins,
        proteins, and carbohydrates. Your milk changes from feed to feed as it adapts to your baby’s needs. It also
        includes critical components not found in infant formula such as hormones, enzymes, immune factors, essential
        fatty acids, and growth factors.
      </p>

      <h3 style={{ fontWeight: 'bold' }}>Establishing Your Milk Supply</h3>
      <p>
        When your baby is not ready to feed directly after birth, you can express milk to be given by alternative
        means such as a feeding tube. Expressing is a learned skill, and our staff can help support you.
        Research shows that how much milk is expressed at two weeks can predict long-term milk production.
        In the first days, you may see just a few drops of colostrum—this is normal and very beneficial for your baby.
      </p>

      <h3 style={{ fontWeight: 'bold' }}>Breastmilk Needs</h3>
      <table style={{ border: '1px solid gray', width: '100%', marginBottom: '10px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid gray', padding: '5px' }}>Day</th>
            <th style={{ border: '1px solid gray', padding: '5px' }}>Stomach Capacity</th>
            <th style={{ border: '1px solid gray', padding: '5px' }}>Amount per Feed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid gray', padding: '5px' }}>Day One</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>Size of a cherry</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>5–7 ml</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid gray', padding: '5px' }}>Day Three</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>Size of a walnut</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>22–27 ml</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid gray', padding: '5px' }}>Day Seven</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>Size of an apricot</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>45–60 ml</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid gray', padding: '5px' }}>One Month</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>Size of a large egg</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>80–150 ml</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ fontWeight: 'bold' }}>Tips for Successful Expressing</h3>

      <p><strong>Early</strong><br />
        Express ideally within 6 hours of birth.<br />
        Use hand expression to collect early colostrum.
      </p>

      <p><strong>Frequent</strong><br />
        Express 8–10 times every 24 hours, including once at night.<br />
        Do not go more than 3–4 hours between sessions.
      </p>

      <p><strong>Effective</strong><br />
        Massage breasts before and during expressing.<br />
        Use breast compression to increase flow.<br />
        Double pumping saves time and boosts output.
      </p>

      <h3 style={{ fontWeight: 'bold' }}>Breast Massage Technique</h3>
      <p>
        Massage improves flow and helps with expressing. Start with a warm cloth, then gently stroke, roll, and press
        around the breast in circular motions toward the areola. Include nipple stimulation.
      </p>

      <img
        src="/EBMTechnique.png"
        alt="Breast Massage Technique"
        style={{ width: '100%', maxWidth: '600px', marginTop: '10px', border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default EBMHealthTipEnglish;