import React from 'react';

const EBMHealthTipArabic = () => {
  return (
    <div style={{ padding: '20px', lineHeight: '2', direction: 'rtl', textAlign: 'right' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '22px', textAlign: 'center' }}>
        نصائح صحية: الرضاعة الطبيعية وتعبير الحليب
      </h2>

      <h3 style={{ fontWeight: 'bold' }}>لماذا يعتبر حليب الأم مهماً؟</h3>
      <p>
        حليب الأم مخصص خصيصاً للرضع من البشر ويحتوي على الماء، الدهون، المعادن، الفيتامينات، البروتينات، والكربوهيدرات.
        يتغير تركيب الحليب من رضعة إلى أخرى حسب احتياجات الطفل، ويحتوي أيضاً على هرمونات وإنزيمات وعوامل مناعية لا تتوفر في الحليب الصناعي.
      </p>

      <h3 style={{ fontWeight: 'bold' }}>كيفية تأسيس مخزون الحليب</h3>
      <p>
        إذا لم يكن الطفل مستعداً للرضاعة مباشرة بعد الولادة، يمكن استخراج الحليب وتقديمه بطرق بديلة مثل الأنبوب المعدي.
        الاستخراج مهارة تُكتسب، ويمكن للممرضات مساعدتك. الكولستروم (اللبأ) هو أول حليب غني ويكفي بكميات قليلة.
      </p>

      <h3 style={{ fontWeight: 'bold' }}>احتياجات الطفل من الحليب</h3>
      <table style={{ border: '1px solid gray', width: '100%', marginBottom: '10px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid gray', padding: '5px' }}>اليوم</th>
            <th style={{ border: '1px solid gray', padding: '5px' }}>سعة المعدة</th>
            <th style={{ border: '1px solid gray', padding: '5px' }}>الكمية لكل رضعة</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid gray', padding: '5px' }}>اليوم الأول</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>بحجم الكرز</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>٥–٧ مل</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid gray', padding: '5px' }}>اليوم الثالث</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>بحجم الجوز</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>٢٢–٢٧ مل</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid gray', padding: '5px' }}>اليوم السابع</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>بحجم المشمش</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>٤٥–٦٠ مل</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid gray', padding: '5px' }}>شهر واحد</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>بحجم بيضة كبيرة</td>
            <td style={{ border: '1px solid gray', padding: '5px' }}>٨٠–١٥٠ مل</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ fontWeight: 'bold' }}>نصائح لنجاح عملية الاستخراج</h3>

      <p><strong>البداية المبكرة:</strong><br />
        يُفضل البدء بالاستخراج خلال ٦ ساعات من الولادة باستخدام اليد لجمع الكولستروم.
      </p>

      <p><strong>التكرار:</strong><br />
        يُنصح بالاستخراج ٨–١٠ مرات خلال ٢٤ ساعة، مع جلسة ليلية.<br />
        عدم ترك أكثر من ٣–٤ ساعات بين الجلسات.
      </p>

      <p><strong>الفعالية:</strong><br />
        دلكي الثدي بلطف قبل وأثناء الاستخراج لتحفيز التدفق.<br />
        يمكن استخدام الضغط اليدوي أو المضخات المزدوجة لزيادة الإنتاج وتوفير الوقت.
      </p>

      <h3 style={{ fontWeight: 'bold' }}>تقنية تدليك الثدي</h3>
      <p>
        يساعد التدليك اللطيف للثدي على تحسين تدفق الحليب. ابدئي بوضع قطعة قماش دافئة، ثم استخدمي حركات دائرية خفيفة حول الثدي،
        ولا تنسي تحفيز الحلمة بلطف أيضاً.
      </p>

      <img
        src="/EBMTechnique.png"
        alt="تقنية تدليك الثدي"
        style={{ width: '100%', maxWidth: '600px', marginTop: '10px', border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default EBMHealthTipArabic;