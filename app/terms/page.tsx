import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "الشروط والأحكام - RASHD-WIFI",
  description: "شروط وأحكام استخدام خدمات شركة راشد واي فاي",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">الشروط والأحكام</h1>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">المقدمة</h2>
          <p className="text-gray-700 leading-relaxed">
            مرحباً بك في شركة راشد واي فاي (RASHD-WIFI). باستخدامك لخدماتنا، فإنك توافق على الالتزام بهذه الشروط
            والأحكام. يرجى قراءتها بعناية قبل استخدام خدماتنا.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">الخدمات المقدمة</h2>
          <p className="text-gray-700 leading-relaxed">
            نقوم بتوفير خدمات الإنترنت عالي السرعة للعملاء في المناطق المشمولة بالتغطية. تشمل خدماتنا تركيب المعدات،
            والصيانة، والدعم الفني على مدار الساعة.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">الاشتراك والفواتير</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mr-4">
            <li>يتطلب الاشتراك في خدماتنا تقديم معلومات دقيقة وكاملة</li>
            <li>يتم إصدار الفواتير شهرياً مقدماً</li>
            <li>يجب سداد الفواتير في الموعد المحدد لتجنب تعليق الخدمة</li>
            <li>قد يتم فرض رسوم تأخير على المدفوعات المتأخرة</li>
            <li>جميع الأسعار قابلة للتغيير بإشعار مسبق مدته 30 يوماً</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">الاستخدام المقبول</h2>
          <p className="text-gray-700 leading-relaxed mb-4">عند استخدام خدماتنا، يجب عليك:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mr-4">
            <li>الامتثال لجميع القوانين واللوائح المعمول بها</li>
            <li>عدم استخدام الخدمة لأنشطة غير قانونية</li>
            <li>عدم التدخل في عمل الشبكة أو تعطيلها</li>
            <li>عدم انتهاك حقوق الملكية الفكرية للآخرين</li>
            <li>عدم مشاركة الخدمة مع أطراف ثالثة دون إذن مسبق</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">المعدات والتركيب</h2>
          <p className="text-gray-700 leading-relaxed">
            نقوم بتوفير المعدات اللازمة لتشغيل الخدمة. المعدات تبقى ملكاً لشركة راشد واي فاي ويجب إعادتها عند إنهاء
            الخدمة. أي ضرر أو فقدان للمعدات قد يؤدي إلى فرض رسوم.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">جودة الخدمة</h2>
          <p className="text-gray-700 leading-relaxed mb-4">نسعى لتقديم خدمة عالية الجودة، ولكن:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mr-4">
            <li>السرعة الفعلية قد تختلف عن السرعة المعلنة بناءً على عوامل متعددة</li>
            <li>قد تحدث انقطاعات مؤقتة للصيانة أو الترقيات</li>
            <li>نوفر دعماً فنياً على مدار الساعة لحل أي مشاكل</li>
            <li>لا نضمن عدم انقطاع الخدمة بنسبة 100%</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">الإلغاء والإنهاء</h2>
          <p className="text-gray-700 leading-relaxed mb-4">شروط إلغاء الخدمة:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mr-4">
            <li>يمكنك إلغاء الاشتراك بإشعار مسبق مدته 30 يوماً</li>
            <li>لا يتم رد رسوم التركيب</li>
            <li>يتم احتساب رسوم الشهر الحالي حتى نهاية الشهر</li>
            <li>يجب إعادة جميع المعدات في حالة جيدة</li>
            <li>نحتفظ بالحق في إنهاء الخدمة في حالة انتهاك الشروط</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">المسؤولية</h2>
          <p className="text-gray-700 leading-relaxed">
            لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام أو عدم القدرة على استخدام خدماتنا، بما في
            ذلك فقدان البيانات أو انقطاع العمل.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">التعديلات على الشروط</h2>
          <p className="text-gray-700 leading-relaxed">
            نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إخطار العملاء بأي تغييرات جوهرية قبل 30 يوماً من
            دخولها حيز التنفيذ.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">القانون الحاكم</h2>
          <p className="text-gray-700 leading-relaxed">
            تخضع هذه الشروط والأحكام لقوانين جمهورية العراق. أي نزاعات تنشأ عن هذه الشروط ستخضع للاختصاص القضائي الحصري
            للمحاكم العراقية.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">معلومات الاتصال</h2>
          <p className="text-gray-700 leading-relaxed">لأي استفسارات حول هذه الشروط والأحكام، يرجى التواصل معنا:</p>
          <div className="mt-4 text-gray-700">
            <p>شركة راشد واي فاي</p>
            <p>العراق</p>
            <p className="mt-2">للاستفسارات: تواصل معنا عبر صفحة الاتصال</p>
          </div>
        </section>

        <section className="border-t pt-8 mt-12">
          <p className="text-sm text-gray-600">
            آخر تحديث: {new Date().toLocaleDateString("ar-IQ", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </section>
      </div>
    </div>
  )
}
