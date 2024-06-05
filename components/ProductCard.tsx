import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import Link from 'next/link'

export default function ProductCard({product}) {
  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1622632169740-85c306c57aa2?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          height={200}
          alt="Ethereum"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{product.name}</Text>
      </Group>

      <Text size="sm" c="dimmed">
       {product.description}
      </Text>
      <Link href={`/product/${product.id}`}>
        <Button color="blue" fullWidth mt="md" radius="md">
          Reviews
        </Button>
      </Link>
    </Card>
  );
}