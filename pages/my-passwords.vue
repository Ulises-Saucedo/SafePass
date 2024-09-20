<script setup lang="ts">
import * as z from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { CATEGORIES } from "~/types/category.types";
import type { Password, PasswordDto } from "~/types/password.manager.types";
import { ManagerService } from "~/services/PasswordService";
import { toast } from "@/components/ui/toast";

useHead({
  title: "Mis contraseñas",
});

definePageMeta({
  middleware: ["auth"],
});

const managerService = new ManagerService();
const passwords: Ref<Password[]> = ref([]);
const isEditing: Ref<boolean> = ref(false);
const selectedId: Ref<number | null> = ref(null);
const dialogOpen: Ref<boolean> = ref(false);
const { initialState, handleStateChange } = useInitialForm();
const showPassword: Ref<boolean[]> = ref([]);
const togglePassword = computed(() => {
  return (password: string, index: number) =>
    showPassword.value[index] ? decryptPassword(password) : password;
});
const toggleVisibility = (index: number) =>
  (showPassword.value[index] = !showPassword.value[index]);
const currentPage: Ref<number> = ref(1);
const paginationPerPage: number = 12;
const paginationPasswords = computed(() =>
  passwords.value.slice(
    (currentPage.value - 1) * paginationPerPage,
    currentPage.value * paginationPerPage
  )
);
const schema = z.object({
  title: z
    .string({
      required_error: "El título es requerido.",
    })
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  account: z.string().email("Formato incorrecto").optional(),
  password: z
    .string({
      required_error: "La contraseña es requerida.",
    })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    })
    .max(50, "Máximo 50 caracteres"),
  website: z
    .string({
      invalid_type_error: "Formato incorrecto",
    })
    .url("Formato incorrecto")
    .max(50, "Máximo 50 caracteres")
    .optional(),
  notes: z
    .string({
      invalid_type_error: "Formato incorrecto",
    })
    .max(255, "Máximo 255 caracteres")
    .optional(),
  category: z.nativeEnum(CATEGORIES),
});
const formData = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: initialState,
});

const deletePassword = async (id: number) => {
  try {
    await managerService.deletePassword(id);
    const updatedPasswords = passwords.value.filter(
      (password) => password.id !== id
    );
    passwords.value = updatedPasswords;
    localStorage.setItem("passwords", JSON.stringify(passwords.value));
    toast({
      title: "Elemento eliminado",
    });
  } catch (e) {
    toast({
      title: "Error. Intente más tarde",
    });
  }
};

const editPassword = async (values: Record<string, any>) => {
  const valuesDto = values as PasswordDto;
  if (!selectedId.value) return;

  try {
    const { data, error } = await managerService.updatePassword(
      selectedId.value,
      valuesDto
    );

    if (error || !data) {
      throw error;
    }

    const updatedPasswords = passwords.value.map((password) =>
      password.id === selectedId.value ? data[0] : password
    );

    passwords.value = updatedPasswords;
    localStorage.setItem("passwords", JSON.stringify(passwords.value));
    toast({
      title: "Elemento actualizado",
    });
  } catch (e) {
    toast({
      title: "Error. Intente más tarde",
    });
  } finally {
    selectedId.value = null;
  }
};

const onSubmit = async (values: Record<string, any>) => {
  const valuesDto = values as PasswordDto;

  try {
    if (isEditing.value) {
      await editPassword(values);
      return;
    }

    const { data, error } = await managerService.createPassword(valuesDto);

    if (error) {
      throw error;
    }

    passwords.value.push(...data);
    toast({
      title: "Elemento agregado correctamente",
    });
    localStorage.setItem("passwords", JSON.stringify(passwords.value));
  } catch (e) {
    toast({
      title: "Error. Intente más tarde",
    });
  } finally {
    dialogOpen.value = false;
  }
};

watch([isEditing, dialogOpen], () => {
  if (!dialogOpen.value) isEditing.value = false;

  if (!isEditing.value) {
    formData.resetForm({
      values: initialState,
    });
  }
});

(async () => {
  if (JSON.parse(localStorage.getItem("passwords") ?? "[]") == 0) {
    passwords.value = (await managerService.getPassword()) ?? [];
    localStorage.setItem("passwords", JSON.stringify(passwords.value));
  }

  const storedPasswords = JSON.parse(localStorage.getItem("passwords") ?? "[]");
  passwords.value = [...storedPasswords];
})();
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <Button class="bg-blue-500 hover:bg-blue-400 w-fit mx-auto mt-16">
        <Icon name="tabler:plus" class="w-4 h-4 mr-2" />
        Añadir
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          <template v-if="isEditing"> Editar contraseña </template>
          <template v-else> Añadir contraseña </template>
        </DialogTitle>
        <DialogDescription>
          LLene el formulario para añadirlo al gestor.
        </DialogDescription>
      </DialogHeader>
      <AutoForm
        class="w-full overflow-y-auto space-y-6"
        :schema="schema"
        :form="formData"
        :field-config="{
          title: {
            label: 'Título',
            inputProps: {
              placeholder: 'Epic Games, Riot games, etc',
            },
          },
          account: {
            label: 'Cuenta',
            inputProps: {
              placeholder: 'rioferdinand@gmail.com',
            },
          },
          password: {
            label: 'Contraseña',
            inputProps: {
              type: 'password',
              placeholder: '••••••••',
            },
          },
          website: {
            label: 'Sitio web',
            inputProps: {
              placeholder: 'https://www.epicgames.com',
            },
          },
          notes: {
            label: 'Notas',
            component: 'textarea',
            inputProps: {
              placeholder: 'Notas sobre la contraseña',
            },
          },
          category: {
            label: 'Categoría',
            inputProps: {
              placeholder: 'Seleccione una categoría',
            },
          },
        }"
        @submit="onSubmit"
      >
        <Button type="submit" class="w-full"> Guardar </Button>
      </AutoForm>
    </DialogContent>
  </Dialog>

  <h2 class="text-center my-4 text-gray-500" v-if="passwords.length == 0">
    No has agregado ninguna contraseña
  </h2>

  <section
    class="max-w-screen-xl w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 my-4"
  >
    <Card v-for="(el, idx) in paginationPasswords" :key="idx">
      <CardHeader>
        <h3 class="text-xl font-bold">Contraseña {{ el.title }}</h3>
      </CardHeader>
      <CardContent>
        <p class="break-words">{{ togglePassword(el.password, idx) }}</p>
        <div class="flex flex-wrap gap-x-2 mt-2">
          <Button
            variant="outline"
            @click="
              () => {
                isEditing = true;
                selectedId = el.id;
                formData.resetForm({
                  values: handleStateChange(el),
                });
                dialogOpen = true;
              }
            "
          >
            <Icon name="tabler:pencil" class="w-4 h-4" /> Editar
          </Button>
          <Button variant="destructive" @click="deletePassword(el.id)">
            <Icon name="tabler:trash" class="w-4 h-4" /> Remover
          </Button>
          <Button class="ms-auto" @click="toggleVisibility(idx)">
            <Icon
              :name="showPassword[idx] ? 'tabler:eye-closed' : 'tabler:eye'"
              class="w-4 h-4"
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  </section>

  <Pagination
    class="mx-auto my-8"
    v-slot="{ page }"
    v-model:page="currentPage"
    :total="passwords.length"
    :sibling-count="1"
    :default-page="1"
    :items-per-page="paginationPerPage"
    show-edges
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>
