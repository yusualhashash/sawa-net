import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "سياسة الخصوصية - RASHD-WIFI",
  description: "سياسة الخصوصية وحماية البيانات لشركة راشد واي فاي",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">سياسة الخصوصية</h1>

      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">المقدمة</h2>
          <p className="text-gray-700 leading-relaxed">
            نحن في شركة راشد واي فاي (RASHD-WIFI) نلتزم بحماية خصوصيتك وبياناتك الشخصية. توضح هذه السياسة كيفية جمع
            واستخدام وحماية معلوماتك الشخصية عند استخدام خدماتنا.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">المعلومات التي نجمعها</h2>
          <p className="text-gray-700 leading-relaxed mb-4">نقوم بجمع المعلومات التالية عند استخدامك لخدماتنا:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mr-4">
            <li>الاسم الكامل</li>
            <li>رقم الهاتف</li>
            <li>عنوان البريد الإلكتروني</li>
            <li>العنوان الفعلي لتركيب الخدمة</li>
            <li>معلومات الفواتير والدفع</li>
            <li>بيانات استخدام الإنترنت</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">كيفية استخدام المعلومات</h2>
          <p className="text-gray-700 leading-relaxed mb-4">نستخدم معلوماتك الشخصية للأغراض التالية:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mr-4">
            <li>تقديم وصيانة خدمات الإنترنت</li>
            <li>معالجة الفواتير والمدفوعات</li>
            <li>التواصل معك بخصوص الخدمة</li>
            <li>تحسين جودة الخدمة</li>
            <li>الامتثال للمتطلبات القانونية</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">حماية البيانات</h2>
          <p className="text-gray-700 leading-relaxed">
            نتخذ إجراءات أمنية صارمة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التغيير أو الإفصاح أو الإتلاف.
            نستخدم تقنيات التشفير والأمان المتقدمة لضمان سلامة معلوماتك.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">مشاركة البيانات</h2>
          <p className="text-gray-700 leading-relaxed">
            لا نقوم بمشاركة أو بيع بياناتك الشخصية لأطراف ثالثة إلا في الحالات التالية:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mr-4 mt-4">
            <li>بموافقتك الصريحة</li>
            <li>للامتثال للمتطلبات القانونية</li>
            <li>لحماية حقوقنا وممتلكاتنا</li>
            <li>مع مزودي الخدمات الموثوقين الذين يساعدوننا في تشغيل أعمالنا</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">حقوقك</h2>
          <p className="text-gray-700 leading-relaxed mb-4">لديك الحق في:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mr-4">
            <li>الوصول إلى بياناتك الشخصية</li>
            <li>تصحيح البيانات غير الدقيقة</li>
            <li>طلب حذف بياناتك</li>
            <li>الاعتراض على معالجة بياناتك</li>
            <li>نقل بياناتك إلى مزود خدمة آخر</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ملفات تعريف الارتباط (Cookies)</h2>
          <p className="text-gray-700 leading-relaxed">
            نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا الإلكتروني. يمكنك التحكم في استخدام ملفات تعريف
            الارتباط من خلال إعدادات المتصفح الخاص بك.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">التحديثات على سياسة الخصوصية</h2>
          <p className="text-gray-700 leading-relaxed">
            قد نقوم بتحديث هذه السياسة من وقت لآخر. سنقوم بإخطارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو من خلال
            إشعار على موقعنا الإلكتروني.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">اتصل بنا</h2>
          <p className="text-gray-700 leading-relaxed">
            إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات البيانات الخاصة بنا، يرجى التواصل معنا:
          </p>
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
