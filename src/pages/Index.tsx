
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ArrowRight, Mail, MessageSquare, Star, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">شركتنا</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <a href="#features" className="text-sm font-medium transition-colors hover:text-primary px-4">
                الميزات
              </a>
              <a href="#services" className="text-sm font-medium transition-colors hover:text-primary px-4">
                الخدمات
              </a>
              <a href="#contact" className="text-sm font-medium transition-colors hover:text-primary px-4">
                اتصل بنا
              </a>
              <Button>ابدأ الآن</Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    أفضل الحلول الرقمية لنجاح عملك
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    نحن نقدم خدمات رقمية متكاملة لمساعدة عملك على النمو والازدهار في العالم الرقمي.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="px-8">استكشف خدماتنا</Button>
                  <Button variant="outline">تواصل معنا</Button>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Hero Image" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">ميزاتنا</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl dark:text-gray-400">
                  نقدم لك مجموعة من الميزات المتقدمة التي تساعدك على تحقيق أهدافك
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 py-8">
              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>خدمة العملاء</CardTitle>
                  <CardDescription>دعم على مدار الساعة لجميع احتياجاتك</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>فريق متخصص من الخبراء جاهز للإجابة على جميع استفساراتك وحل جميع مشاكلك في أي وقت.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Star className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>جودة عالية</CardTitle>
                  <CardDescription>معايير الجودة العالمية</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>نلتزم بتقديم أعلى معايير الجودة في جميع خدماتنا لضمان رضا عملائنا.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <ArrowRight className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>سرعة التنفيذ</CardTitle>
                  <CardDescription>مشاريع منجزة في وقت قياسي</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>نعمل بكفاءة عالية لإنجاز مشاريعك في الوقت المحدد دون المساس بالجودة.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">خدماتنا</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl dark:text-gray-400">
                  مجموعة متكاملة من الخدمات الرقمية لتلبية احتياجات عملك
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-8">
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 text-center hover:border-primary">
                <MessageSquare className="mx-auto h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold">تطوير المواقع</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">مواقع متجاوبة وسهلة الاستخدام</p>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 text-center hover:border-primary">
                <Users className="mx-auto h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold">التسويق الرقمي</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">استراتيجيات تسويقية فعالة</p>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 text-center hover:border-primary">
                <Star className="mx-auto h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold">تحسين محركات البحث</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">تحسين ظهور موقعك على محركات البحث</p>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 text-center hover:border-primary">
                <Mail className="mx-auto h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold">تصميم الهوية</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">هوية بصرية مميزة تعكس قيم علامتك التجارية</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">اتصل بنا</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl dark:text-gray-400">
                  نحن هنا للإجابة على جميع استفساراتك
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-md space-y-4 py-8">
              <div className="space-y-2">
                <Input placeholder="الاسم الكامل" />
                <Input type="email" placeholder="البريد الإلكتروني" />
                <Input placeholder="رقم الهاتف" />
                <Input placeholder="الموضوع" />
                <textarea 
                  className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                  placeholder="الرسالة"
                />
                <Button className="w-full">إرسال</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            &copy; {new Date().getFullYear()} شركتنا. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              من نحن
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              الخصوصية
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              الشروط
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
