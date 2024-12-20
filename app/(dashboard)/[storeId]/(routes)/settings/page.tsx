import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { SettingsForm } from "./components/settings-form";
import ClientForm from "@/components/client-form";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col relative">
      <ClientForm>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SettingsForm initialData={store} />
        </div>
      </ClientForm>
    </div>
  );
};

export default SettingsPage;
